import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import authRoute from "./routes/authRoute.js";
import videoRoute from "./routes/routeVideo.js";
import channelRoutes from "./routes/channelRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);
app.use("/api/channel", channelRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.send("Api Running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});