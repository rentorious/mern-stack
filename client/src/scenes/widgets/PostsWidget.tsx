import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { selectState, setPosts } from "../../state";
import PostWidget from "./PostWidget";

function PostsWidget({ userId, isProfile = false }) {
  const dispatch = useDispatch();

  const { posts, token, baseUrl } = useSelector(selectState);

  useEffect(() => {
    if (isProfile) getUserPosts();
    else getPosts();

    async function getPosts() {
      const response = await fetch(`${baseUrl}/posts`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }

    async function getUserPosts() {
      const response = await fetch(
        `https://localhost:3001/posts/${userId}/posts`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();
      dispatch(setPosts({ posts: data }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
}

export default PostsWidget;
