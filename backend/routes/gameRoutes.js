import express from "express";
const router = express.Router();
import { linkUser } from "../controllers/gameController.js";
import gameMiddleware from "../middleware/gameMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.use(gameMiddleware);

router.post("/link", authMiddleware, linkUser);

export default router;