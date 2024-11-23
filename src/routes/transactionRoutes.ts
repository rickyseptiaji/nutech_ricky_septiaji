import { Router } from "express";
import accessValidation from "../middlewares/accessValidation";
import { balanceController, historyTransaction, topupController, transactionController } from "../controllers/transactionController";

const router = Router();

router.get('/balance', accessValidation, balanceController);
router.post('/topup', accessValidation, topupController);
router.post('/transaction', accessValidation, transactionController);
router.get('/transaction/history', accessValidation, historyTransaction);

export default router;