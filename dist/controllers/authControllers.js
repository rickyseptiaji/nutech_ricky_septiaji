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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jwtUtils_1 = __importDefault(require("../utils/jwtUtils"));
const JWT_SECRET = process.env.JWT_SECRET;
// fungsi untuk register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, first_name, last_name, profile_image } = req.body;
    try {
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(409).json({
                status: 103,
                message: 'Email sudah terdaftar',
                data: null
            });
            return;
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                first_name,
                last_name,
                profile_image
            }
        });
        res.status(200).json({
            status: 0,
            message: 'Registrasi berhasil silahkan login',
            data: null
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error',
            data: null
        });
    }
});
exports.register = register;
// fungsi untuk login
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({
                status: 103,
                message: 'User tidak ada',
                data: null
            });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({
                status: 103,
                message: 'Username atau password salah',
                data: null
            });
            return;
        }
        const token = (0, jwtUtils_1.default)({ email: user.email }, JWT_SECRET, "12h");
        res.status(200).json({
            status: 0,
            message: 'Login sukses',
            data: {
                token: token
            }
        });
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
});
exports.login = login;
