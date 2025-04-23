import axios from "axios";
import { useState, useEffect } from "react"; 
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai"; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import baseUrl from "../config.js";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const [userBlogs, setUserBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${baseUrl}api/posts/userData`, {
                    withCredentials: true,
                });
                setUserData(response.data);

                const userPosts = await axios.get(`${baseUrl}api/posts/userPosts`, {
                    withCredentials: true,
                });

                if (Array.isArray(userPosts.data)) {
                    setUserBlogs(userPosts.data);
                }
            } catch (err) {
                console.log("Error in the getData Page:", err);
                alert("Getting UserData Failed");
            }
        };

        getData();
    }, []);

    const deleteBlog = async (postId) => {
        const res = await axios.post(`${baseUrl}api/posts/deleteBlog`, {
            postId,
        }, {
            withCredentials: true,
        });

        if (res) {
            alert("Deleted successfully....");
            setUserBlogs(prevBlogs => prevBlogs.filter(blog => (postId !== blog._id)));
        }
        else {
            console.log("error in deleting the post");
            alert("Deletion Failed....");
        }
    }

    return (
        <>
           

            <div className="container-fluid bg-black text-light min-vh-100 py-5">
                <div className="row g-4">
                    {/* Left Side - Blogs */}
                    <div className="col-md-8">
                        <h2 className="mb-4 text-info">{userData.name} Blogs</h2>
                        {userBlogs.length === 0 ? (
                            <p className="">No posts yet.</p>
                        ) : (
                            userBlogs.map((blog) => (
                                <div className="card mb-4 bg-dark text-light border border-secondary shadow-sm rounded-4" key={blog._id} onClick={()=>navigate(`/blog/${blog._id}`)}>
                                    {blog.imageUrl !== "" && (
                                        <img
                                            src={blog.imageUrl}
                                            alt={blog.title}
                                            className="card-img-top rounded-top"
                                            style={{ maxHeight: "300px", objectFit: "cover" }}
                                        />
                                    )}

                                    <div className="card-body">
                                        <h5 className="card-title text-light">{blog.title}</h5>
                                        <p className="card-text text-light">
                                            {blog.content.length > 100
                                                ? blog.content.slice(0, 100) + "..."
                                                : blog.content}
                                        </p>
                                        <p className="text-secondary small">
                                            Posted on {new Date(blog.createdAt).toLocaleDateString()}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mt-3">
                                            <div className="text-light d-flex align-items-center gap-2">
                                                <AiOutlineLike size={20} />
                                                {blog.likes.length}
                                            </div>
                                            {/* <div className="text-light d-flex align-items-center gap-2">
                                                <FaComment size={18} />
                                                {blog.comment}
                                            </div> */}
                                            <button
                                                className="btn btn-outline-danger btn-sm px-3 rounded-pill"
                                                onClick={() => deleteBlog(blog._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Right Side - User Info */}
                    <div className="col-md-4">
                        <h2 className="mb-4 text-info">Profile</h2>
                        <div className="bg-dark text-light p-4 rounded-4 shadow-sm border border-secondary text-center">
                            <FaUserCircle size={80} className="mb-3 text-info" />
                            <h4 className="mb-2">{userData.name}</h4>
                            <p className="mb-0">
                                <strong>Email:</strong> {userData.email}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
