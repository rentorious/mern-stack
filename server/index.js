import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import multer from "multer";
// eslint-disable-next-line no-unused-vars
import dotenv from "dotenv";

import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

import { verifyToken } from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

// CONFIGURATIONS

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// ROUTES WITH FILES
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

    // ADD DATA ONE TIME
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.error(`${error}! did not connect`));
