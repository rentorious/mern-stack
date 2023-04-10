import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: String,
    },
    postId: {
      type: String,
      required: String,
    },
    content: {
      type: String,
      required: String,
    },
    firstName: {
      type: String,
      required: String,
    },
    lastName: {
      type: String,
      required: String,
    },
    email: {
      type: String,
      required: String,
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    userPicturePath: String,
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
