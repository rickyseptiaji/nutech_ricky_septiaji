"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accessValidation_1 = __importDefault(require("../middlewares/accessValidation"));
const profileControllers_1 = require("../controllers/profileControllers");
const router = (0, express_1.Router)();
router.get("/profile", accessValidation_1.default, profileControllers_1.getUserProfile);
router.put("/profile/update", accessValidation_1.default, profileControllers_1.updateUserProfile);
router.put("/profile/image", accessValidation_1.default, profileControllers_1.updateImageProfile);
exports.default = router;
