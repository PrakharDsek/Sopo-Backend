import cookieParser from "cookie-parser";
import express from "express";
import Auth from "./routes/Auth.js";
import Post from "./routes/Post.js";
import User from "./routes/User.js";
import Comments from "./routes/Comments.js";
import Friends from "./routes/Friends.js";
import cors from "cors";
import "dotenv/config.js";

const app = express();

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", Auth);
app.use("/api/v1/post", Post);
app.use("/api/v1/user", User);
app.use("/api/v1/comments", Comments);
app.use("/api/v1/friends", Friends);

//Routes

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to SOPO backend",
  });
});

export default app;
