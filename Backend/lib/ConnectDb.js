import mongoose from "mongoose";

export const ConnectDB = async(req, res)=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected");
    }
    catch(err){
        console.log("Error in Database connection:", err); 
    }
}

export default ConnectDB;