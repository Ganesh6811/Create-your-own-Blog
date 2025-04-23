import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home.jsx"; 
import axios from "axios";
import SignUp from "./Authentication/signupPage.jsx";
import Login from "./Authentication/LoginPage.jsx";
import Profile from "./Pages/profile.jsx";
import CreateBlog from "./components/CreateBlog.jsx";
import BlogDetails from "./components/BlogDetails.jsx";
import baseUrl from "./config.js";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}api/auth/check`, {
          withCredentials: true,
        }); 

        if (res.data._id) {
          console.log(res.data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log("Not logged in:", error);
        setIsAuthenticated(false);
      }
    };

    checkUser();
  }, [isAuthenticated]);

  if (isAuthenticated == null) {
    return <p>Loading....</p>;
  }

  return (
    <div className="App bg-dark text-light min-vh-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/signUp" element={!isAuthenticated ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/createBlog" element={isAuthenticated ? <CreateBlog /> : <Navigate to="/login" />} />
          <Route path="/blog/:id" element={isAuthenticated ? <BlogDetails /> : <Navigate to = "/login"/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
