import express from "express";
const router = express.Router();
import {getUsers} from "../controllers/usersController.js";

router.get("/", getUsers);

router.get("/", getUsers);

export default router;