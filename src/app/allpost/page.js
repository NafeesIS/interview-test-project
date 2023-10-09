import React from "react";
import AddPost from "../components/AddPost";
import Post from "../components/post";
import { getPosts } from "../utils/getposts";

const AllPost = async () => {
  const allPost = await getPosts();
  console.log(allPost.length);
  return (
    <div>
      <AddPost></AddPost>
      <div>
        {allPost.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
