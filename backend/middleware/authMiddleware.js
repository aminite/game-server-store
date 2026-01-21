import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/usersModel.js";

export default asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).orFail();
      next();
    } catch (err) {
      res.status(400);
      throw new Error("Invalid Token");
    }
  }
  if (!token) {
    res.status(400);
    throw new Error("Invalid Token");
  }
});