import express from "express";
import {
    getAllStartUp,
    multiAddStartUp,
    getStartUp,
    updateStartUp,
    delStartUp,
  } from "../controller/startUpController.js";

const router = express.Router();

router.post("/multi-add", multiAddStartUp);

router.get("/get-all", getAllStartUp);
router.get("/get/:id", getStartUp);
router.put("/update/:id", updateStartUp);
router.delete("/delete/:id", delStartUp);

export default router;