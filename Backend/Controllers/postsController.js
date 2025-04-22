import express from "express";
import { v2 as cloudinary } from "cloudinary";
import Posts from "../Model/PostModel.js";
import User from "../Model/UserModel.js";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export const createPost = async (req, res) => {
    const { title, content, imageData } = req.body;
    const userId = req.user._id;

    try {

        let imageUrl;
        if (imageData === "") {
            imageUrl = "";
        }
        else {
            const uploadResponse = await cloudinary.uploader.upload(imageData);
            imageUrl = uploadResponse.secure_url;
        }

        const postData = new Posts({
            title,
            content,
            imageUrl,
            userId,
        });

        await postData.save();

        return res.status(201).json({ message: "Post created successfully", post: postData });
    }
    catch (error) {
        console.log("Error in createPost controller: ", error);
        res.status(400).json({ message: "Internal Server error" });
    }
}


export const DeletePost = async (req, res) => {
    const { postId } = req.body;
    if (!postId) {
        return res.status(400).json({ message: "Post ID is required" });
    }

    try {
        const deletedPost = await Posts.deleteOne({ _id: postId });

        if (deletedPost.deletedCount === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post was successfully deleted" });
    }
    catch (error) {
        console.log("error in delete controller:", error);
        res.status(400).json({ message: "Internal server error" });
    }
}


export const getLatestPosts = async (req, res) => {
    try {
        const latestPosts = await Posts.find().sort({ createdAt: -1 });
        if (latestPosts.length == 0) {
            return res.status(200).json({ message: "There are no Posts" });
        }
        return res.status(200).json(latestPosts);
    }
    catch (err) {
        console.log("Error in getLatestPosts controller:", err);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const userData = async (req, res) => {
    const { _id } = req.user._id;
    try {
        const userData = await User.findOne({ _id });
        res.status(200).json(userData);
    }
    catch (error) {
        console.log("Error in UserData controller:", error);
        res.status(400).json({ message: "Internal Server Error" });
    }
}


export const userPosts = async (req, res) => {
    const { _id } = req.user._id;

    try {
        const userData = await Posts.find({ userId: _id });
        if (userData.length == 0) {
            return res.status(200).json({ message: "There are no posts" });
        }

        return res.status(200).json(userData);
    }
    catch (error) {
        console.log("Error in userPosts controller:", error);
        res.status(400).json("Internal Server Error");
    }
}


export const getSearchedPosts = async (req, res) => {
    const query = req.query.query; // Get ?query=something from the URL

    // Case 1: Search query is missing or empty
    if (!query || query.trim() === "") {
        return res.status(200).json([]); // Send empty array
    }

    try {
        const postsData = await Posts.find({
            title: { $regex: query.trim(), $options: "i" },
        });
 
        if (postsData.length === 0) {
            return res.status(200).json({ message: "No records found for this search" });
        }

        
        return res.status(200).json(postsData);

    } catch (err) {
        console.error("Error in getSearchedPosts controller:", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


export const postDetails = async (req, res) => {
    const { blogId } = req.body;
    try {
        const blogData = await Posts.findOne({ _id: blogId });
        res.status(200).json(blogData);
    }
    catch (err) {
        console.log("Error in postDetails route:", err);
        res.status(400).json({ message: "Internal server error.." });
    }
}


export const likePost = async (req, res) => {
    try {
      const { _id } = req.user._id;
      const userId = _id;
      const {blogId} = req.body; 
  
      const post = await Posts.findById(blogId);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      if (!post.likes) {
        post.likes = [];
      }
  
      if (post.likes.includes(userId)) {
        // If already liked, remove like (unlike)
        post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
      } else {
        post.likes.push(userId);
      }
  
      await post.save();
      res.status(200).json({ message: "Like status updated", likes: post.likes });
  
    } catch (error) {
      console.error("Error in the likePost controller:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  