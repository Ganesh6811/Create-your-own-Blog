import dotenv from "dotenv"; 
import User from "../Model/UserModel.js";  // Make sure the path is correct
import mongoose from "mongoose";

dotenv.config(); 


const seedUsers = [
    // Female Users
    {
        name: "Emma Thompson",
        email: "emma.thompson@example.com",
        password: "123456", // Remember to hash passwords in production
        profilePic: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
        name: "Olivia Miller",
        email: "olivia.miller@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        name: "Sophia Davis",
        email: "sophia.davis@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        name: "Ava Wilson",
        email: "ava.wilson@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
        name: "Isabella Brown",
        email: "isabella.brown@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        name: "Mia Johnson",
        email: "mia.johnson@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/6.jpg",
    },
    {
        name: "Charlotte Williams",
        email: "charlotte.williams@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
        name: "Amelia Garcia",
        email: "amelia.garcia@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/8.jpg",
    },

    // Male Users
    {
        name: "James Anderson",
        email: "james.anderson@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
        name: "William Clark",
        email: "william.clark@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
        name: "Benjamin Taylor",
        email: "benjamin.taylor@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
        name: "Lucas Moore",
        email: "lucas.moore@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
        name: "Henry Jackson",
        email: "henry.jackson@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
        name: "Alexander Martin",
        email: "alexander.martin@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
        name: "Daniel Rodriguez",
        email: "daniel.rodriguez@example.com",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
];

const seedDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://ganeshsudhanagunta68:dgXyie7HH2xs17tS@personalblogging.vcfk9ou.mongodb.net/Write_your_own_story?retryWrites=true&w=majority&appName=PersonalBlogging");
        console.log("Database Connected");
        await User.insertMany(seedUsers);
        console.log("Database seeded successfully!");
    }
    catch (err) {
        console.log("Error in Database connection:", err);
        console.error("Error seeding the database:", err);
    }
    
};

// Call the function to seed the database
seedDatabase();
