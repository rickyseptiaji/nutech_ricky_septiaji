"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
//validasi register
const registerSchema = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        "string.email": "Parameter email tidak sesuai format",
        "any.required": "Email wajib diisi",
    }),
    password: joi_1.default.string().min(8).required().messages({
        "string.min": "Password minimal 8 karakter",
        "any.required": "Password wajib diisi",
    }),
    first_name: joi_1.default.string().required().messages({
        "any.required": "Nama depan wajib diisi",
    }),
    last_name: joi_1.default.string().required().messages({
        "any.required": "Nama belakang wajib diisi",
    }),
    profile_image: joi_1.default.string().pattern(/\.(jpeg|png)$/i).messages({
        "string.pattern.base": "Gambar harus berupa file .jpeg, atau .png",
    }),
});
exports.default = registerSchema;
