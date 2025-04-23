import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import baseUrl from "../config.js";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageData, setImageData] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageData(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${baseUrl}api/posts/createPost`,
        {
          title,
          content,
          imageData,
        },
        {
          withCredentials: true,
        }
      );

      alert("Post created successfully!");
      console.log(res.data);

      // Reset form
      setTitle("");
      setContent("");
      setImageData("");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="container py-5 bg-black text-light min-vh-100">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5 border-bottom border-secondary pb-3">
        <div className="d-flex align-items-center gap-2">
          <div className="fs-3">📝</div>
          <h2 className="mb-0 text-info">Create a Blog</h2>
        </div>
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="btn btn-outline-info px-4 rounded-pill"
            onClick={handleSubmit}
          >
            Publish
          </button>
          <div className="fs-3">👤</div>
        </div>
      </div>

      {/* Blog Form */}
      <form onSubmit={handleSubmit} className="bg-dark p-4 rounded-4 shadow border border-secondary">
        <div className="mb-4">
          <label className="form-label text-light">Blog Title</label>
          <input
            type="text"
            className="form-control bg-secondary text-light border-0 rounded-3"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label text-light">Content</label>
          <textarea
            className="form-control bg-secondary text-light border-0 rounded-3"
            rows="8"
            placeholder="Write your blog content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="form-label text-light">Upload Image</label>
          <input
            type="file"
            className="form-control bg-secondary text-light border-0 rounded-3"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        {/* Image Preview */}
        {imageData && (
          <div className="mb-4 text-center">
            <img
              src={imageData}
              alt="Preview"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateBlog;
