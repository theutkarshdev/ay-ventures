import express from 'express';
import {getAllMatchMaking,getSingleMatchMaking} from "../controller/matchMakingController.js"
const router=express.Router();


router.get("/get-all",getAllMatchMaking)
router.get("/get/:id",getSingleMatchMaking)



export default router