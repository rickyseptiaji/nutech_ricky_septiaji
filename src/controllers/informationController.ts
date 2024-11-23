import { Request, Response } from "express";
import prisma from "../config/prisma";

// fungsi untuk get data banner
export const bannerController = async (req: Request, res: Response) => {
  const banner = await prisma.banner.findMany({
    select: {
      banner_name: true,
      banner_image: true,
      description: true,
    },
  });

  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: banner,
  });
};

// fungsi get data services
export const servicesController = async (req: Request, res: Response) => {
  const services = await prisma.services.findMany({
    select: {
      service_code: true,
      service_name: true,
      service_icon: true,
      service_tarif: true
    },
  });

  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: services,
  });
  };