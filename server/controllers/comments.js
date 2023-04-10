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
      likes: {},
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
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const likeComment = async (req, res) => {
  try {
    const { commentId, postId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    const isLiked = comment.likes.get(userId);

    if (isLiked) comment.likes.delete(userId);
    else comment.likes.set(userId, true);

    await comment.save();

    const post = await Post.findById(postId);

    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
