import express from "express";
import bcrypt from "bcrypt";
import User from "../Model/UserModel.js";
import generateToken from "../lib/utils.js";

export const signUp = async(req, res)=>{
    const {name, email, password} = req.body;

    try{
        if(!name || !email|| !password){
            return res.status(400).json({message:"All fileds are required"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        });

        await newUser.save();
        generateToken(newUser, res);
        
        res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });

    }
    catch(err){
        console.log("Error in signUp controller:", err);
        res.status(400).json({message:"Internal Server error"});
    }
}


export const login = async(req, res)=>{
    const {email, password} = req.body;

    try{

        if(!email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        const checkData = await User.findOne({email});
        if(!checkData){
            return res.status(400).json({message:"Creadentails are wrong."});
        }

        const checkPassword = await bcrypt.compare(password, checkData.password);
        if(checkPassword){
            generateToken(checkData, res);
            console.log("Logged in");
            return res.status(200).json(checkData);
        }
        else{
            console.log("Creadentials are wrong");
            return res.status(400).json({message:"Internal server Error"});
        }

    }
    catch(err){
        console.log("Error in login controller:", err);
        res.status(400).json({message:"Internal Server Error"});
    }
}


export const logOut = async(req, res)=>{
    try{
        res.cookie("jwt", "", {maxAge: 0});
        console.log("Logged out Successfully");
    }
    catch(err){
        console.log("Error in logOut Controller");
        res.status(400).json({message:"Internal server Error"});
    }
}


export const checkAuth = async(req, res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(error){
        console.log("Error in the checkAuth controller:", error);
        res.status(400).json({message:"Internal Server Error"});
    }
}