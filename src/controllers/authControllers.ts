import { Request, Response } from "express";
import bcrypt from "bcryptjs"; 
import prisma from "../config/prisma";
import generateToken from "../utils/jwtUtils";
const JWT_SECRET = process.env.JWT_SECRET!;

// fungsi untuk register
export const register = async(req: Request, res: Response) => {
const {email, password, first_name, last_name, profile_image} = req.body;

try {
    const existingUser = await prisma.user.findUnique({where: {email}})
    if (existingUser) {
        res.status(409).json({
            status: 103,
            message: 'Email sudah terdaftar',
            data: null
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            first_name,
            last_name,
            profile_image
        }
    })

    res.status(200).json({
        status: 0,
        message: 'Registrasi berhasil silahkan login',
        data: null
    })
} catch (error) {
    res.status(500).json({
        status: 500,
        message: 'Internal server error',
        data: null
    })
}
}

// fungsi untuk login
export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;

    try {
        const user = await prisma.user.findUnique({where: {email}})
        if (!user) {
            res.status(404).json({
                status: 103,
                message: 'User tidak ada',
                data: null
            })
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({
                status: 103,
                message: 'Username atau password salah',
                data: null
            })
            return;
        }

        const token = generateToken({email: user.email}, JWT_SECRET, "12h");
        res.status(200).json({
            status: 0,
            message: 'Login sukses',
            data: {
                token: token
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan pada server',
            data: null
        })
    }
}