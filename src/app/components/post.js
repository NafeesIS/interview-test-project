"use client";

import { uploadImage } from "@/hooks/uploadImage"; // Import the image upload function
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal from "./Modal";

const Post = ({ post }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [postToEdit, setPostToEdit] = useState(post);
  const [imageFile, setImageFile] = useState(null);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Check if there's a new image to upload
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        const imageUrl = url.data.display_url;
        setPostToEdit((prevPost) => ({ ...prevPost, image: imageUrl }));
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    axios
      .patch(`/api/posts/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
        setOpenModalEdit(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostToEdit((prevPost) => ({ ...prevPost, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`, postToEdit)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // setInputs({});
        setOpenModalDelete(false);
        router.refresh();
      });
  };
  return (
    <div>
      <div className="p-3 my-5 bg-slate-300">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <h1 className="text-2xl font-bold">{post.category}</h1>
        <Image
          src={post.image} // Provide the image URL here
          alt={post.topic} // Provide alt text for accessibility
          width={400} // Set the desired width
          height={300} // Set the desired height
        />
        <p>{post.content}</p>
        <div className="pt-5 flex">
          <button className="text-blue-600 mr-4" onClick={() => setOpenModalEdit(true)}>
            Edit
          </button>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form className="w-full" onSubmit={handleEditSubmit}>
              <h1 className="text-2xl pb-2">Update Post</h1>
              <input type="text" placeholder="Title" name="title" className="w-full p-2" value={postToEdit.title || ""} onChange={handleChange}></input>
              <input type="text" placeholder="Description" name="content" className="w-full p-2 my-5" value={postToEdit.content || ""} onChange={handleChange}></input>
              <input type="text" placeholder="Content Details" name="content_details" className="w-full p-2 my-5" value={postToEdit.content_details || ""} onChange={handleChange}></input>
              <input type="file" name="imageFile" className="w-full p-2 my-5" onChange={handleImageChange} />
              <button type="submit" className="bg-blue-700 text-white px-5 py-2">
                Submit
              </button>
            </form>
          </Modal>
          <button className="text-red-600 " onClick={() => setOpenModalDelete(true)}>
            Delete
          </button>
          <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
            <h1>Are you sure you want to delete this post?</h1>
            <div className="">
              <button className="bg-blue-700 text-white font-semibold m-2 p-2" onClick={() => setOpenModalDelete(false)}>
                No
              </button>
              <button className="bg-red-700 text-white font-semibold m-2 p-2" onClick={() => handleDeletePost(post.id)}>
                yes
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Post;
