import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import baseUrl from "../config.js";

const BlogDetails = () => {
  const { id } = useParams();
  const [blogData, setBlogData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.post(`${baseUrl}/api/posts/blogDetails`, {
          blogId: id,
        }, {
          withCredentials: true,
        });

        setBlogData(res.data);
      } catch (err) {
        console.log("Error in the BlogDetails component:", err);
        setError("Error displaying this Blog");
      }
    };

    getData();
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!blogData) return <div>Loading...</div>;

  return (
    <div className="container mt-4 text-light">
      <h2>{blogData.title}</h2>
      {blogData.imageUrl && (
        <img
          src={blogData.imageUrl}
          alt={blogData.title}
          style={{ width: "100%", height: "auto", maxHeight: "400px", objectFit: "cover" }}
        />
      )}
      <p className="mt-3">{blogData.content}</p>
      <p>Posted on {new Date(blogData.createdAt).toLocaleDateString()}</p>
      <p>Likes: {blogData.likes ? blogData.likes.length : 0}</p>
      {/* <p>Comments: {blogData.comments.length}</p> */}
    </div>
  );
};

export default BlogDetails;
