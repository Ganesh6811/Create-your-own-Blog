import express from "express";
import { createPost, DeletePost, getLatestPosts, getSearchedPosts, likePost, postDetails, userData, userPosts } from "../Controllers/postsController.js";
import protectedRoute from "../middleware/protectedRoute.js";

const route = express.Router();

route.get("/latestPosts", protectedRoute, getLatestPosts);
route.get("/userData", protectedRoute, userData);
route.get("/userPosts", protectedRoute, userPosts);
route.post("/createPost", protectedRoute, createPost);
route.post("/deleteBlog", protectedRoute, DeletePost)
route.get("", protectedRoute, getSearchedPosts);
route.post("/blogDetails", protectedRoute, postDetails);
route.post("/like/", protectedRoute, likePost);


export default route;