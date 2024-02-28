import express from "express";
import {
  getAllInvestor,
  multiAddInvestor,
  getInvestor,
  updateInvestor,
  delInvestor,
} from "../controller/investorController.js";
const router = express.Router();

router.post("/multi-add", multiAddInvestor);

router.get("/get-all", getAllInvestor);
router.get("/get/:id", getInvestor);
router.put("/update/:id", updateInvestor);
router.delete("/delete/:id", delInvestor);

export default router;
