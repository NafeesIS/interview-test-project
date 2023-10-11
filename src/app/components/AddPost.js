"use client";
import { uploadImage } from "@/hooks/uploadImage";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Modal from "./Modal";

const AddPost = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [inputs, setInputs] = useState({});
  const [imageFile, setImageFile] = useState(null); // Store the selected image file

  const handleImageUpload = async () => {
    if (imageFile) {
      try {
        const url = await uploadImage(imageFile);
        const imageUrl = url.data.display_url;
        setInputs((prevInputs) => ({ ...prevInputs, image: imageUrl }));
        Swal.fire("Success", "Image uploaded successfully!", "success");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Failed to upload image", "error");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/posts", inputs)
      .then((res) => {
        console.log(res);
        Swal.fire("Success", "Post Added successfully!", "success");
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to add the post", "error");
      })
      .finally(() => {
        setInputs({});
        setImageFile(null);
        setModalOpen(false);
        router.refresh();
      });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="bg-blue-700 text-white p-3">
        Add New Post
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="text-2xl pb-2">Add New Post</h1>
          <input type="text" placeholder="Title" name="title" className="w-full p-2" value={inputs.title || ""} onChange={handleChange}></input>
          <input type="text" placeholder="Category" name="category" className="w-full p-2 my-5" value={inputs.category || ""} onChange={handleChange}></input>
          <input type="text" placeholder="Content" name="content" className="w-full p-2 my-5" value={inputs.content || ""} onChange={handleChange}></input>
          <input type="text" placeholder="Content Details" name="content_details" className="w-full p-2 my-5" value={inputs.content_details || ""} onChange={handleChange}></input>

          <input type="file" name="image" className="w-full p-2 my-5" onChange={handleImageChange} />
          <button type="button" onClick={handleImageUpload} className="bg-blue-700 text-white px-5 py-2">
            Upload Image
          </button>
          <button type="submit" className="bg-blue-700 text-white px-5 py-2">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddPost;
