import express from "express";
import { createLocalData, getLocalData } from "../controller/localController.js";

const router = express.Router();

router.post("/", createLocalData);
router.get("/", getLocalData);

export default router;
