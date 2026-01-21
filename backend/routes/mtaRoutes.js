import express from "express";
const router = express.Router();
import { linkUser } from "../controllers/mtaController.js";
import mtaMiddleware from "../middleware/mtaMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.use(mtaMiddleware);

router.post("/link", authMiddleware, linkUser);

export default router;