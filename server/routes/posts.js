import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { createComment } from "../controllers/comments.js";

const router = express.Router();

// READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId", verifyToken, getUserPosts);

// UPDATE
router.patch("/:id/like", verifyToken, likePost);

// COMMENTS
// CREATE
router.post("/:id/comments", verifyToken, createComment);
export default router;
