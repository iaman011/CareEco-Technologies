import express from "express";
import { createCloudData, getCloudData } from "../controller/cloudController.js";

const router = express.Router();

router.post("/", createCloudData);
router.get("/", getCloudData);

export default router;
