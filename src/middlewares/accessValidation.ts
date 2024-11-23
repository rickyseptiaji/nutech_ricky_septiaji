  import jwt from "jsonwebtoken";
  import { Request, Response, NextFunction } from "express";
//access validasi
  const accessValidation = (req: Request, res: Response, next: NextFunction,) => {
    const secretKey = process.env.JWT_SECRET!;
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({
        status: 108,
        message: "Belum ada token",
        data: null,
      });
      return;
    }

    try {
      jwt.verify(token, secretKey);
      next();
    } catch (error) {
      res.status(403).json({
        status: 108,
        message: "Token tidak valid atau kadaluwarsa",
        data: null
      });
      return;
    }
  };

  export default accessValidation;
