import asyncHandler from "express-async-handler";
import availableSubscriptions from "../config/subscriptions.js";

const getSubscriptions = asyncHandler(async (req, res) => {
    res.status(200).json(availableSubscriptions);
});

export {getSubscriptions};