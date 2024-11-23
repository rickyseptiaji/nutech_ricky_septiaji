"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//access validasi
const accessValidation = (req, res, next) => {
    var _a;
    const secretKey = process.env.JWT_SECRET;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    if (!token) {
        res.status(401).json({
            status: 108,
            message: "Belum ada token",
            data: null,
        });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, secretKey);
        next();
    }
    catch (error) {
        res.status(403).json({
            status: 108,
            message: "Token tidak valid atau kadaluwarsa",
            data: null
        });
        return;
    }
};
exports.default = accessValidation;
