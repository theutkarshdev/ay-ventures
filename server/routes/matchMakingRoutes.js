import express from 'express';
import {InvestorMatchMaking,StartUpMatchMaking} from "../controller/matchMakingController.js"
const router=express.Router();

router.get("/investor",InvestorMatchMaking)
router.get("/startup",StartUpMatchMaking)



export default router