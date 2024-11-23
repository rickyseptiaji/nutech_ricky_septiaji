import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

interface CustomJwtPayload extends Request {
  email: string;
}

// fungsi untuk cek saldo
export const balanceController = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  const decode = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  const email = decode.email;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const balance = await prisma.balance.findMany({
    where: {
      userId: user!.id,
    },
    select: {
      balance: true,
    },
  });
  res.status(200).json({
    status: 0,
    message: "Get balance berhasil",
    data: {
      balance: balance,
    },
  });
};


// fungsi untuk top up saldo
export const topupController = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  const decode = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  const email = decode.email;
  const { top_up_amount } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  let balance = await prisma.balance.findFirst({
    where: { userId: user!.id },
  });
  if (balance) {
    balance = await prisma.balance.update({
      where: { id: balance!.id },
      data: {
        balance: {
          increment: top_up_amount,
        },
      },
    });
  } else {
    balance = await prisma.balance.create({
      data: {
        balance: top_up_amount,
        userId: user!.id,
      },
    });
  }

  res.status(200).json({
    status: 0,
    message: "Top Up Balance berhasil",
    data: {
      balance: balance.balance,
    },
  });
};


// fungsi untuk tranksaksi
export const transactionController = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  const decode = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  const email = decode.email;
  const { service_code } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  const service = await prisma.services.findFirst({
    where: {
      service_code: service_code,
    },
  });

  const invoiceNumber = `INV${Date.now()}-${user!.id}`;

  const transaction = await prisma.$transaction(async () => {
    await prisma.balance.update({
      where: { id: user!.id },
      data: {
        balance: {
          decrement: service!.service_tarif,
        },
      },
    });
    const newTransaction = await prisma.transaction.create({
      data: {
        userId: user!.id,
        serviceId: service!.id,
        invoice_number: invoiceNumber,
        transaction_type: "PAYMENT",
        total: service!.service_tarif,
      },
    });
    return newTransaction;
  });

  res.status(200).json({
    status: 0,
    message: "Transaksi berhasil",
    data: {
      invoice_number: transaction.invoice_number,
      service_code: service!.service_code,
      service_name: service!.service_name,
      transaction_type: transaction.transaction_type,
      total_amount: transaction.total,
      create_on: transaction.createAt,
    },
  });
};

export const historyTransaction = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  const decode = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  const email = decode.email;
  const { offset, limit } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const transactions = await prisma.transaction.findMany({
    where: { userId: user!.id },
    orderBy: {
      createAt: "desc",
    },
    take: limit ? parseInt(limit as string) : undefined,
    skip: offset ? parseInt(offset as string) : undefined,
    select: {
      invoice_number: true,
      transaction_type: true,
      service: {
        select: {
          service_name: true,
        },
      },
      total: true,
      createAt: true,
    },
  });

  res.status(200).json({
    status: 0,
    message: "Get History Berhasil",
    data: {
      offset: offset,
      limit: limit,
      records: transactions.map((transactions) => ({
        invoice_number: transactions.invoice_number,
        transaction_type: transactions.transaction_type,
        description: transactions.service.service_name,
        total_amount: transactions.total,
        create_on: transactions.createAt,
      })),
    },
  });
};
