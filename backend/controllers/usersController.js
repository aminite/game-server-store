import asyncHandler from "express-async-handler";
import User from "../models/usersModel.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import availableSubscriptions from "../config/subscriptions.js";
import Subscription from "../models/subscriptionsModel.js";
const saltRounds = 10;

const registerUser = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
        res.status(400);
        throw new Error("Please fill all fields");
    }
    const userExists = await User.findOne({email: req.body.email});
    if (userExists) {
        res.status(400);
        throw new Error("User already Exists");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = await User.create({
        email: req.body.email,
        password: hashedPassword
    })
    res.status(200).json({ message: "success", token: generateToken(user._id) });
});

const loginUser = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.email || !req.body.password) {
      res.status(400);
      throw new Error("Please fill all fields");
    }
    const user = await User.findOne({ email: req.body.email });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
        res.status(200).json({ message: "success", token: generateToken(user._id) });
    } else {
        res.status(400);
        throw new Error("Wrong email or password");
    }
});

const getSubscriptions = asyncHandler(async (req, res) => {
    const subscriptions = await Subscription.find({user: req.user._id});
    res.status(200).json(subscriptions);
})

const subscribeUser = asyncHandler(async (req, res) => {
    if (!req.body || !req.body.subscriptionName) {
        res.status(400);
        throw new Error("Please fill all fields")
    }
    const sub = availableSubscriptions[req.body.subscriptionName];
    if (!sub) {
      res.status(400);
      throw new Error("Subscription not found");
    }
    await Subscription.create({
      subscription: req.body.subscriptionName,
      user: req.user._id,
      expiresAt: new Date(Date.now() + sub.duration * 24 * 60 * 60 * 1000),
    });
    res.status(200).json({message: "success"});
});

function generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}
export {registerUser, loginUser, getSubscriptions, subscribeUser };