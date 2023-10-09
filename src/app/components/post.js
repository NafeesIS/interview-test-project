"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";

const Post = ({ post }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [postToEdit, setPostTolEdit] = useState(post);
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`/api/posts/${post.id}`, postToEdit)
      .then((res) => {
        console.log(res);
        // Show a success alert
        Swal.fire("Success", "Post edited successfully!", "success");
      })
      .catch((err) => {
        console.log(err);
        // Show an error alert
        Swal.fire("Error", "An error occurred while editing the post.", "error");
      })
      .finally(() => {
        setOpenModalEdit(false);
        window.location.reload();
      });
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPostTolEdit((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleDeletePost = (id) => {
    axios
      .delete(`/api/posts/${id}`, postToEdit)
      .then((res) => {
        console.log(res);
        // Show a success alert
        Swal.fire("Success", "Post deleted successfully!", "success");
      })
      .catch((err) => {
        console.log(err);
        // Show an error alert
        Swal.fire("Error", "An error occurred while deleting the post.", "error");
      })
      .finally(() => {
        setOpenModalDelete(false);
        window.location.reload();
      });
  };

  return (
    <div>
      <div className="p-3 my-5 bg-slate-300">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <h1 className="text-xl font-semibold">{post.category}</h1>
        <p>{post.content}</p>
        <div className="pt-5 flex">
          <button className="text-blue-600 mr-4" onClick={() => setOpenModalEdit(true)}>
            Edit
          </button>
          <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
            <form className="w-full" onSubmit={handleEditSubmit}>
              <h1 className="text-2xl pb-2">Update Post</h1>
              <input type="text" placeholder="Title" name="title" className="w-full p-2" value={postToEdit.title || ""} onChange={handleChange}></input>
              <input type="text" placeholder="Category" name="category" className="w-full p-2 my-5" value={postToEdit.category || ""} onChange={handleChange}></input>
              <input type="text" placeholder="Content" name="content" className="w-full p-2 my-5" value={postToEdit.content || ""} onChange={handleChange}></input>
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
