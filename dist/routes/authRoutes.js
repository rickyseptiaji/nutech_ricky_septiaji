"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const registerSchemas_1 = __importDefault(require("../schemas/registerSchemas"));
const loginSchemas_1 = __importDefault(require("../schemas/loginSchemas"));
const router = (0, express_1.Router)();
router.post("/register", (0, validateRequest_1.default)(registerSchemas_1.default), authControllers_1.register);
router.post("/login", (0, validateRequest_1.default)(loginSchemas_1.default), authControllers_1.login);
exports.default = router;
