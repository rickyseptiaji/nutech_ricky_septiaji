import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

interface CustomJwtPayload extends Request {
  email: string;
}

// fungsi untuk get user
export const getUserProfile = async (req: Request, res: Response) => {
  const user = await prisma.user.findMany({
    select: {
      email: true,
      first_name: true,
      last_name: true,
      profile_image: true
    }
  });

  res.status(200).json({
    status: 0,
    message: "Sukses",
    data: user
  });
};


// fungsi untuk update data user
export const updateUserProfile = async(req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  const email = decoded.email;
  const {first_name, last_name} = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const updatedUser = await prisma.user.update({
    where: {email},
    data: {
      first_name: first_name,
      last_name: last_name
    }
  })

  res.status(200).json({
    status: 0,
    message: "Update Pofile berhasil",
    data: {
      email: updatedUser.email,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      profile_image: user?.profile_image
    }
  })
}


// fungsi untuk update foto user
export const updateImageProfile = async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1]!;
  const JWT_SECRET = process.env.JWT_SECRET!;
  const decoded = jwt.verify(token, JWT_SECRET) as CustomJwtPayload;
  const email = decoded.email;
  const {profile_image} = req.body;
  const user = await prisma.user.findUnique({
    where: { email },
  });

  const updateImage = await prisma.user.update({
    where: {email},
    data: {
      profile_image: profile_image
    }
  })

  res.status(200).json({
    status: 0,
    message: "Update Profile Image berhasil",
    data: {
      email: email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      profile_image: updateImage.profile_image
    }
  })
}