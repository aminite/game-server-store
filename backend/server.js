import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import usersRoute from "./routes/usersRoute.js";

import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express()

dotenv.config("../env");
connectDB();

app.use("/users", usersRoute);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})