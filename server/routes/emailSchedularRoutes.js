import express from "express";
import{sendInitialMail} from "../controller/emailSchedularController.js"
const router=express.Router();

router.get("/send",sendInitialMail)



export default router