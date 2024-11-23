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
exports.updateImageProfile = exports.updateUserProfile = exports.getUserProfile = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
// fungsi untuk get user
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findMany({
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
});
exports.getUserProfile = getUserProfile;
// fungsi untuk update data user
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const email = decoded.email;
    const { first_name, last_name } = req.body;
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    const updatedUser = yield prisma_1.default.user.update({
        where: { email },
        data: {
            first_name: first_name,
            last_name: last_name
        }
    });
    res.status(200).json({
        status: 0,
        message: "Update Pofile berhasil",
        data: {
            email: updatedUser.email,
            first_name: updatedUser.first_name,
            last_name: updatedUser.last_name,
            profile_image: user === null || user === void 0 ? void 0 : user.profile_image
        }
    });
});
exports.updateUserProfile = updateUserProfile;
// fungsi untuk update foto user
const updateImageProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    const email = decoded.email;
    const { profile_image } = req.body;
    const user = yield prisma_1.default.user.findUnique({
        where: { email },
    });
    const updateImage = yield prisma_1.default.user.update({
        where: { email },
        data: {
            profile_image: profile_image
        }
    });
    res.status(200).json({
        status: 0,
        message: "Update Profile Image berhasil",
        data: {
            email: email,
            first_name: user === null || user === void 0 ? void 0 : user.first_name,
            last_name: user === null || user === void 0 ? void 0 : user.last_name,
            profile_image: updateImage.profile_image
        }
    });
});
exports.updateImageProfile = updateImageProfile;
