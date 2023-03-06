import {Router} from"express";
import authRouter from "./auth.routers";
import sendEmail from "../controller/email"
const { body, validationResult } = require('express-validator');

const router =Router();

router.use("/auth",authRouter);
router.post('/email/send',sendEmail)
 //let b = [
//     body('sender').isEmail().normalizeEmail(),
//     body('receiver').isEmail().normalizeEmail(),
//     body('subject').not().isEmpty().trim().escape(),
//     body('text').not().isEmpty().trim().escape()
//   ] 
  export default router