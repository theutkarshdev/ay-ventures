import express from "express";
import { getAllInvestor, multiAddInvestor, getInvestor } from "../controller/investorController.js";
const router = express.Router();

router.post("/multi-add", multiAddInvestor);

router.get("/get-all", getAllInvestor);
router.get("/get/:id", getInvestor);

export default router;
