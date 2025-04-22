import React, { useState } from "react";
import icon from "../assets/Icon.png";
import { FaUserCircle } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import axios from "axios";
import DisplayLatestBlogs from "./DisplayLatestBloggs";
import baseUrl from "../config.js";

const Header = () => {
  const [searchItem, setSearchItem] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchItem.trim() === "") {
      setSearchedPosts([]);
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}/api/posts/?query=${searchItem}`, {
        withCredentials: true,
      });

      if (Array.isArray(res.data)) {
        setSearchedPosts(res.data.length > 0 ? res.data : []);
      } else {
        setSearchedPosts([]);
      }
    } catch (error) {
      console.error("Search failed:", error);
      setSearchedPosts([]);
    }
  };

  return (
    <>
      <div
        className="container-fluid py-3 shadow-sm"
        style={{
          backgroundColor: "#121212",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <form onSubmit={handleSearch}>
          <div className="row align-items-center">
            <div className="col-2 d-flex justify-content-start">
              <img src={icon} alt="Logo" width={40} height={40} />
            </div>

            <div className="col-8 d-flex justify-content-center">
              <input
                type="search"
                className="form-control w-75"
                placeholder="Search..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                style={{
                  backgroundColor: "#2C2C2C",
                  color: "#E0E0E0",
                  border: "1px solid #444",
                }}
              />
            </div>

            <div className="col-2 d-flex justify-content-around">
              <Link to="/createBlog">
                <TfiWrite size={30} color="#E0E0E0" />
              </Link>
              <Link to="/profile">
                <FaUserCircle size={40} color="#E0E0E0" />
              </Link>
            </div>
          </div>
        </form>
      </div>

      <DisplayLatestBlogs searchedBlogs={searchedPosts} />
    </>
  );
};

export default Header;
