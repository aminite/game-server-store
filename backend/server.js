import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import usersRoute from "./routes/usersRoute.js";
import gameRoutes from "./routes/gameRoutes.js";
import subscriptionsRoutes from "./routes/subscriptionsRoutes.js";

import errorMiddleware from "./middleware/errorMiddleware.js";
import cors from "cors";

const app = express()

dotenv.config("../env");
connectDB();

app.use(
  cors({
    origin: "http://localhost:5173", // ONLY allow your Vue app
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRoute);
app.use("/mta", gameRoutes);
app.use("/subscriptions", subscriptionsRoutes);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})