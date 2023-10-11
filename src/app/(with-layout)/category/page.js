"use client";
import Post from "@/app/components/post";
import { getPosts } from "@/app/utils/getposts";
import { useEffect, useState } from "react";

const Category = () => {
  const [allPost, setAllPost] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Fetch all posts and update state
    async function fetchPosts() {
      const posts = await getPosts();
      setAllPost(posts);
      const categories = Array.from(new Set(posts.map((post) => post.category)));
      setUniqueCategories(categories);
    }

    fetchPosts();
  }, []);

  const filteredPosts = selectedCategory ? allPost.filter((post) => post.category === selectedCategory) : allPost;

  return (
    <div className="mt-5">
      <div className="flex cursor-pointer mx-auto text-center max-w-2xl">
        {uniqueCategories.map((category) => (
          <div className={`flex ${selectedCategory === category ? "font-bold text-teal-600 mx-auto" : " mx-auto"}`} key={category} onClick={() => setSelectedCategory(category)}>
            <div className="flex text-center mx-auto">
              <h2 className="flex flex-row text-center mx-auto">{category}</h2>
            </div>
          </div>
        ))}
      </div>
      <div>
        {selectedCategory ? filteredPosts.map((post) => <Post key={post.id} post={post}></Post>) : <p className="mt-10 font-bold text-4xl text-center">Please select a category to view posts.</p>}
      </div>
    </div>
  );
};

export default Category;
