"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accessValidation_1 = __importDefault(require("../middlewares/accessValidation"));
const transactionController_1 = require("../controllers/transactionController");
const router = (0, express_1.Router)();
router.get('/balance', accessValidation_1.default, transactionController_1.balanceController);
router.post('/topup', accessValidation_1.default, transactionController_1.topupController);
router.post('/transaction', accessValidation_1.default, transactionController_1.transactionController);
router.get('/transaction/history', accessValidation_1.default, transactionController_1.historyTransaction);
exports.default = router;
