"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// validasi login
const loginSchemas = joi_1.default.object({
    email: joi_1.default.string().email().required().messages({
        'string.email': 'Parameter email tidak sesuai format',
        'any.required': 'Email wajib diisi'
    }),
    password: joi_1.default.string().min(8).required().messages({
        'string.min': 'Password minimal 8 karakter',
        'any.required': 'Password wajib diisi'
    })
});
exports.default = loginSchemas;
