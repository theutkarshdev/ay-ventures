import express from 'express';
import {InvestorMatchMaking,StartUpMatchMaking,getAllMatchMaking} from "../controller/matchMakingController.js"
const router=express.Router();

router.get("/investor",InvestorMatchMaking)
router.get("/startup",StartUpMatchMaking)
router.get("/get-all",getAllMatchMaking)



export default router