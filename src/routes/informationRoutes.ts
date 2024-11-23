import { Router } from "express";
import accessValidation from "../middlewares/accessValidation";
import { bannerController, servicesController } from "../controllers/informationController";


const router = Router();

router.get('/banner', accessValidation,bannerController)
router.get('/services', accessValidation,servicesController)

export default router;