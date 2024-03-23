import express from "express";
import{sendCronjobsMails} from "../controller/emailSchedularController.js"
import { cronAuth } from "../middleware/cronAuth.js";
const router=express.Router();

router.get("/send",cronAuth,sendCronjobsMails)



export default router