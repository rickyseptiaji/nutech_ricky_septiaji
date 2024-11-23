"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyTransaction = exports.transactionController = exports.topupController = exports.balanceController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
// fungsi untuk cek saldo
const balanceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const email = decode.email;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    const balance = yield prisma_1.default.balance.findMany({
        where: {
            userId: user.id,
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
});
exports.balanceController = balanceController;
// fungsi untuk top up saldo
const topupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const email = decode.email;
    const { top_up_amount } = req.body;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    let balance = yield prisma_1.default.balance.findFirst({
        where: { userId: user.id },
    });
    if (balance) {
        balance = yield prisma_1.default.balance.update({
            where: { id: balance.id },
            data: {
                balance: {
                    increment: top_up_amount,
                },
            },
        });
    }
    else {
        balance = yield prisma_1.default.balance.create({
            data: {
                balance: top_up_amount,
                userId: user.id,
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
});
exports.topupController = topupController;
// fungsi untuk tranksaksi
const transactionController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const email = decode.email;
    const { service_code } = req.body;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    const service = yield prisma_1.default.services.findFirst({
        where: {
            service_code: service_code,
        },
    });
    const invoiceNumber = `INV${Date.now()}-${user.id}`;
    const transaction = yield prisma_1.default.$transaction(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.default.balance.update({
            where: { id: user.id },
            data: {
                balance: {
                    decrement: service.service_tarif,
                },
            },
        });
        const newTransaction = yield prisma_1.default.transaction.create({
            data: {
                userId: user.id,
                serviceId: service.id,
                invoice_number: invoiceNumber,
                transaction_type: "PAYMENT",
                total: service.service_tarif,
            },
        });
        return newTransaction;
    }));
    res.status(200).json({
        status: 0,
        message: "Transaksi berhasil",
        data: {
            invoice_number: transaction.invoice_number,
            service_code: service.service_code,
            service_name: service.service_name,
            transaction_type: transaction.transaction_type,
            total_amount: transaction.total,
            create_on: transaction.createAt,
        },
    });
});
exports.transactionController = transactionController;
const historyTransaction = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const email = decode.email;
    const { offset, limit } = req.query;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email,
        },
    });
    const transactions = yield prisma_1.default.transaction.findMany({
        where: { userId: user.id },
        orderBy: {
            createAt: "desc",
        },
        take: limit ? parseInt(limit) : undefined,
        skip: offset ? parseInt(offset) : undefined,
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
});
exports.historyTransaction = historyTransaction;
