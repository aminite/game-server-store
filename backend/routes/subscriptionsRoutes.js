import express from "express";
const router = express.Router();
import {getSubscriptions} from "../controllers/subscriptionsController.js";

router.get("/", getSubscriptions);

export default router;