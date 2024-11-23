import { Router } from "express";
import {register, login} from "../controllers/authControllers"
import validateRequest from "../middlewares/validateRequest";
import registerSchema from "../schemas/registerSchemas";
import loginSchemas from "../schemas/loginSchemas";

const router = Router();

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchemas), login);

export default router;