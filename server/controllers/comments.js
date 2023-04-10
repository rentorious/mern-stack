import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    // get comment data
    const { userId, content, firstName, lastName, email, userPicturePath } =
      req.body;

    // get postId from params
    const { id: postId } = req.params;

    // create mongoose comment object
    const newComment = Comment({
      userId,
      postId,
      content,
      firstName,
      lastName,
      email,
      userPicturePath,
    });
    // save the comment
    await newComment.save();
    // get the post we want to add the comment to and add the new comment
    const { comments = [] } = (await Post.findById(postId)) ?? {};
    comments.unshift(newComment._id);
    // save the post
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { comments },
      { new: true }
    )
      .populate("comments")
      .exec();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};
