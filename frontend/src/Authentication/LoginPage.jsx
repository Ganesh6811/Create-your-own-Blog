import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../config.js";

function Login() { 
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            email,
            password,
        };

        try {
            const res = await axios.post(`${baseUrl}api/auth/login`, data,{
                withCredentials:true,
            });
            console.log(res.data); 
            navigate("/");
        }
        catch (err) {
            console.log("Login Failed:", err);
            alert("Login Failed");
        }
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                backgroundColor: "#121212",
                backgroundImage: "url('/your-dark-theme-image.png')", 
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div
                className="p-4 rounded shadow"
                style={{
                    backgroundColor: "rgba(30, 30, 30, 0.75)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <h2 className="text-center text-light mb-4">Log In</h2>
                <form action="/" method="post" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label text-light">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            style={{
                                backgroundColor: "#2C2C2C",
                                color: "#E0E0E0",
                                border: "1px solid #444",
                            }}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label text-light">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            style={{
                                backgroundColor: "#2C2C2C",
                                color: "#E0E0E0",
                                border: "1px solid #444",
                            }}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100 mt-3"
                        style={{
                            backgroundColor: "#4F46E5",
                            color: "#fff",
                            boxShadow: "0 0 10px #4F46E5",
                            border: "none",
                        }} 
                    >
                        Log In
                    </button>
                </form>

                <div className="d-flex align-items-center gap-2 mt-4">
                    <p className="text-light mb-0">Don't have an Account ?</p>
                    <Link to="/signUp" className="text-decoration-none">Sign Up</Link>
                </div>

            </div>
        </div>
    );
}

export default Login;
