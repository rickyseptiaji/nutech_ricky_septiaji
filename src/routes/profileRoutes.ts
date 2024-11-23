import { Router } from "express";
import accessvalidation from "../middlewares/accessValidation";
import { getUserProfile, updateImageProfile, updateUserProfile } from "../controllers/profileControllers";

const router = Router();

router.get("/profile", accessvalidation, getUserProfile);
router.put("/profile/update", accessvalidation, updateUserProfile);
router.put("/profile/image", accessvalidation, updateImageProfile);

export default router;