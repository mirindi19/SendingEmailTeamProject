import {Router} from"express";
import authRouter from "./auth.routers";
import sendEmail from "../controller/email"
const { body, validationResult } = require('express-validator');

const router =Router();

router.use("/auth",authRouter);
router.post('/email/send',sendEmail)

export default router;
