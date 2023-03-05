import { Router } from "express";
import authController from"../controller/authController";
const router = Router();

router.post("/signup",authController.creatAccount);
export default router