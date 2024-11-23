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
exports.servicesController = exports.bannerController = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
// fungsi untuk get data banner
const bannerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const banner = yield prisma_1.default.banner.findMany({
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
});
exports.bannerController = bannerController;
// fungsi get data services
const servicesController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield prisma_1.default.services.findMany({
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
});
exports.servicesController = servicesController;
