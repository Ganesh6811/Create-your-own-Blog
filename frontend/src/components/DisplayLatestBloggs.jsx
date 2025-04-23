import axios from "axios";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineLike } from "react-icons/ai"; 
import { useNavigate } from "react-router-dom";
import { BiSolidLike } from "react-icons/bi";
import baseUrl from "../config.js";

const DisplayLatestBlogs = ({ searchedBlogs }) => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");

  const blogsToShow = searchedBlogs && searchedBlogs.length > 0 ? searchedBlogs : latestBlogs;

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/posts/latestPosts`, {
          withCredentials: true,
        });

        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            setError("No posts found");
          } else {
            setLatestBlogs(response.data);
          }
        } else {
          setError(response.data.message || "Something went wrong");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs");
      } finally {
        setLoading(false);
      }
    };

    if (!searchedBlogs || searchedBlogs.length === 0) {
      getData();
    } else {
      setLoading(false);
    }
  }, [searchedBlogs]);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}api/auth/check`, {
          withCredentials: true,
        });

        if (res.data._id) {
          console.log(res.data);
          setUserId(res.data._id);
        } else {
          setUserId("");
        }
      } catch (error) {
        console.log("Didn't get the userDetails", error);
        setUserId("")
      }
    };

    checkUser();
  }, []);

  // Handle like button click
  const handleLike = async (blogId) => {
    try {
      const res = await axios.post(
        `${baseUrl}api/posts/like/`,
        { blogId },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setLatestBlogs((prevBlogs) =>
          prevBlogs.map((blog) => {
            if (blog._id === blogId) {
              const alreadyLiked = blog.likes.includes(userId);
              const updatedLikes = alreadyLiked
                ? blog.likes.filter((id) => id !== userId)
                : [...blog.likes, userId];

              return { ...blog, likes: updatedLikes };
            }
            return blog;
          })
        );
      }
    } catch (err) {
      console.log("Error in handleLike:", err);
      alert("Problem with Like button");
    }
  };


  return (
    <div className="container mt-4">
      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger bg-dark text-light border-light">
          {error}
        </div>
      )}

      <div className="row">
        {blogsToShow.length > 0 ? (
          blogsToShow.map((blog) => (
            <div className="col-md-4 mb-4" key={blog._id}>
              <div
                className="card h-100 shadow"
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#E0E0E0",
                  border: "1px solid #333",
                }}
              >
                {blog.imageUrl && (
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title"
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    {blog.title}
                  </h5>
                  <p
                    className="card-text"
                    style={{ flexGrow: 1, cursor: "pointer" }}
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  >
                    {blog.content.length > 100
                      ? blog.content.slice(0, 100) + "..."
                      : blog.content}
                  </p>
                  <p className="small">
                    Posted on {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between mt-2">
                    <div
                      className="d-flex align-items-center gap-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(blog._id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {blog.likes.includes(userId) ? (
                        <BiSolidLike size={20} color="#ffffff" /> // White color when liked
                      ) : (
                        <AiOutlineLike size={20} color="#E0E0E0" />
                      )}

                      <span>{blog.likes ? blog.likes.length : 0}</span> {/* Show like count */}
                    </div>
                    {/* <div
                      className="d-flex align-items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                      style={{ cursor: "default" }}
                    >
                      <FaComment size={18} color="#E0E0E0" />
                      <span>{blog.comments?.length || 0}</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading &&
          !error && (
            <div className="alert alert-info bg-dark text-light border-light">
              No blogs found for your search.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default DisplayLatestBlogs;
