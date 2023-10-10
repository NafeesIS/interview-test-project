"use client";
import React, { useEffect, useState } from "react";
import { getPosts } from "../utils/getposts";
import Post from "./post";

const Home = () => {
  const [allPost, setAllPost] = useState([]);
  const [showAllPosts, setShowAllPosts] = useState(false); // State to control whether to show all posts

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await getPosts();
        // Sort the posts by createdAt in descending order (newest first)
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAllPost(sortedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Define a variable to determine if the "See More" button should be shown
  const showSeeMoreButton = allPost.length > 10;

  // Slice the array to show either the first 10 items or all items based on the state
  const displayedPosts = showAllPosts ? allPost : allPost.slice(0, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Home Page</h1>
      <div>
        {displayedPosts.map((post) => (
          <Post key={post.id} post={post}></Post>
        ))}
        {showSeeMoreButton && (
          <button className="bg-blue-600 p-4" onClick={() => setShowAllPosts(!showAllPosts)}>
            {showAllPosts ? "Show Less" : "See More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
