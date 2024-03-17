import express from 'express';
import {getAllMatchMaking} from "../controller/matchMakingController.js"
const router=express.Router();


router.get("/get-all",getAllMatchMaking)



export default router