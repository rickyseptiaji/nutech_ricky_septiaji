"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accessValidation_1 = __importDefault(require("../middlewares/accessValidation"));
const informationController_1 = require("../controllers/informationController");
const router = (0, express_1.Router)();
router.get('/banner', accessValidation_1.default, informationController_1.bannerController);
router.get('/services', accessValidation_1.default, informationController_1.servicesController);
exports.default = router;
