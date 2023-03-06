import { Router } from "express";
import authController from"../controller/authController";
import checkUser from "../middelwares/checkUser";
const router = Router();

router.post("/signup",authController.creatAccount);
router.post("/login",checkUser,authController.Login);
export default router