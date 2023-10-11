import AddPost from "@/app/components/AddPost";
import Post from "@/app/components/post";
import { getPosts } from "@/app/utils/getposts";
import React from "react";

const AllPost = async () => {
  const allPost = await getPosts();
  console.log(allPost.length);
  return (
    <div className="my-4">
      <AddPost />
      <div>
        {allPost.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
      </div>
    </div>
  );
};

export default AllPost;
