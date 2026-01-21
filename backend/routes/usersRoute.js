import express from "express";
const router = express.Router();
import {registerUser, loginUser, getSubscriptions, subscribeUser} from "../controllers/usersController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/", registerUser);

router.post("/login", loginUser);

router.get("/subscriptions", authMiddleware, getSubscriptions)
router.post("/subscriptions", authMiddleware, subscribeUser);

export default router;