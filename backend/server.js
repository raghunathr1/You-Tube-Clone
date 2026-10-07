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

// CORS Configuration
app.use(
    cors({
        origin: "https://you-tube-clone-three-snowy.vercel.app",
        credentials: true,
    })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);
app.use("/api/channel", channelRoutes);

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err));

// Test API
app.get("/", (req, res) => {
    res.send("Api Running");
});

// Server
const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Running on ${PORT}`);
});