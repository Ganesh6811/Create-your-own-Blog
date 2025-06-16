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
  const bars = [
    { height: 120, delay: "0s", marginTop: 20 },
    { height: 140, delay: "0.15s", marginTop: 10 },
    { height: 120, delay: "0.3s", marginTop: 20 },
    { height: 140, delay: "0.45s", marginTop: 20 },
    { height: 140, delay: "0.6s", marginTop: 10 },
    { height: 120, delay: "0.75s", marginTop: 20 },
  ];
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
  }, []);

  if (isAuthenticated == null) {
    return <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(140deg, #000 20%, #161643 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style> 
      
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        gap: 80,
      }}>
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          gap: 16,
        }}>
          {bars.map((bar, idx) => (
            <div
              key={idx}
              style={{
                width: 20,
                height: bar.height,
                background: "#f74cf7",
                borderRadius: 999,
                boxShadow: "0 4px 24px 0 rgba(34,211,238,0.5)",
                animation: `bounce 1.2s infinite`,
                animationDelay: bar.delay,
                marginTop: bar.marginTop,
              }}
            ></div>
          ))}
        </div>
        <div
          style={{
            color: "#a193e2",
            fontSize: "2.25rem",
            letterSpacing: "0.4em",
            fontWeight: 600,
            opacity: 0.8,
            animation: "pulse 1.5s infinite",
            margin: 0,
          }}
        >
          LOADING
        </div>
      </div>
    </div>;
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
