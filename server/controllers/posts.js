import mongoose from "mongoose";
import Post from "../models/Post.js";
import User from "../models/User.js";
import { uploadPostPicture } from "../s3/upload.js";

// CREATE
export const createPost = async (req, res) => {
  try {
    const { userId, description } = req.body;

    const _id = new mongoose.Types.ObjectId();

    let picturePath = null;
    if (req.file) {
      // upload image to s3
      const postImageS3Key = await uploadPostPicture(
        userId,
        _id.valueOf(),
        req.file
      );
      const CDN_URL = process.env.AWS_CDN_URL ?? "";
      picturePath = `${CDN_URL}/${postImageS3Key}`;
    }

    const user = await User.findById(userId);
    const newPost = Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      userPicturePath: user.picturePath,
      description,
      picturePath,
      likes: {},
    });
    await newPost.save();

    const allPosts = await Post.find().sort({ createdAt: -1 });
    res.status(201).json(allPosts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(allPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(userPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
