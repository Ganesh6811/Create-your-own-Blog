import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import AuthRoute from "./Routes/authRoute.js";
import PostsRoute from "./Routes/postRoute.js";
import ConnectDB from "./lib/ConnectDb.js";
import { v2 as cloudinary } from "cloudinary";



dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(cors({
    origin: `https://create-your-own-blog-frontend.onrender.com`, 
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],   
    allowedHeaders: ["Content-Type", "Authorization"],   
}));



app.use("/api/auth/", AuthRoute);
app.use("/api/posts/", PostsRoute);

app.listen(port, ()=>{
    console.log(`Server is working on port ${port}`);
    ConnectDB();
})
