import asyncHandler from "express-async-handler";
import User from "../models/usersModel.js";



const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

const registerUser = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }
    const user = await User.findOne({email: req.body.email});
    if (user) {
        res.status(400);
        throw new Error("User already Exists");
    }
        
});
export {getUsers};