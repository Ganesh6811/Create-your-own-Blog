import mongoose from "mongoose";
import Post from "../Model/PostModel.js";

// Sample blog post data for seeding
const seedPosts = [
    {
        title: "The Beauty of Nature",
        content: "Nature is one of the most beautiful and awe-inspiring things on this earth. From the majestic mountains to the serene lakes, nature offers a variety of landscapes that captivate the soul. Whether it's the changing seasons or the vibrant flora and fauna, nature constantly reminds us of the simple beauty in life. The tranquil sound of waves crashing on the shore, the scent of fresh rain, or the sight of a clear night sky full of stars all contribute to our sense of peace and wonder.",
        userId: "60b6a6357c28be001f48ba65",
        imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80",
    },
    {
        title: "Technology and Innovation",
        content: "In today's fast-paced world, technology plays a central role in shaping our lives. From smartphones to artificial intelligence, technology has revolutionized the way we live, work, and communicate. Innovations like virtual reality, self-driving cars, and the internet of things are just the beginning of what is to come. As technology continues to evolve, it promises to create new opportunities and solve some of the most pressing challenges facing humanity.",
        userId: "60b6a6357c28be001f48ba66",
        imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1350&q=80",
    },
    {
        title: "The Power of Meditation",
        content: "Meditation has been practiced for thousands of years, and its benefits are vast. It is not only a way to relax but also a method to improve mental health, enhance concentration, and increase mindfulness. Regular meditation helps reduce stress, anxiety, and depression, while also promoting a sense of inner peace. Whether it's through mindfulness meditation, guided visualization, or deep breathing exercises, the practice of meditation can help you connect with yourself and find balance in a chaotic world.",
        userId: "60b6a6357c28be001f48ba67",
        imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1350&q=80",
    },
    {
        title: "Traveling the World",
        content: "Traveling opens up a world of experiences, allowing us to discover new cultures, meet new people, and broaden our perspectives. Each destination offers something unique, whether it's the rich history of ancient cities, the taste of local cuisine, or the beauty of untouched landscapes. Traveling allows us to step outside our comfort zones and embrace the unknown. It teaches us to be more adaptable, open-minded, and appreciative of the diversity that exists in the world. Traveling is not just about visiting new places; it's about the journey itself and the lessons we learn along the way.",
        userId: "60b6a6357c28be001f48ba68",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1350&q=80",
    },
    {
        title: "The Future of Education",
        content: "Education is constantly evolving to meet the needs of a changing world. With advancements in technology, the future of education is becoming more personalized, accessible, and interactive. Online learning platforms, digital classrooms, and virtual labs are transforming how students learn, providing greater flexibility and access to education for people around the world. The future of education will continue to embrace innovation, encouraging lifelong learning and preparing individuals for the challenges of the 21st century.",
        userId: "60b6a6357c28be001f48ba69",
        imageUrl: "https://images.unsplash.com/photo-1584697964380-5b1f9b69a636?auto=format&fit=crop&w=1350&q=80",
    },
    {
        title: "Fitness and Wellness",
        content: "Maintaining a healthy lifestyle is crucial for overall well-being. Fitness and wellness go hand in hand, as regular physical activity improves cardiovascular health, boosts energy levels, and helps manage stress. A balanced diet, adequate sleep, and regular exercise form the foundation of a healthy lifestyle. Whether it's yoga, running, or strength training, finding an activity that you enjoy can make all the difference. Wellness is not just about physical health; it also encompasses mental and emotional well-being, making it essential to take care of your mind as well as your body.",
        userId: "60b6a6357c28be001f48ba70",
        imageUrl: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=1350&q=80",
    },
    {
        title: "The Impact of Social Media",
        content: "Social media has become an integral part of our daily lives. While it has its benefits, such as connecting people across the globe and providing a platform for self-expression, it also has its drawbacks. The constant exposure to curated content can lead to unrealistic comparisons, lower self-esteem, and increased anxiety. It is essential to use social media mindfully, setting boundaries to protect mental health. By being aware of its impact and how we engage with it, we can harness the positive aspects of social media while minimizing its negative effects.",
        userId: "60b6a6357c28be001f48ba71",
        imageUrl: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=1350&q=80",
    }
];

const seedDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://ganeshsudhanagunta68:dgXyie7HH2xs17tS@personalblogging.vcfk9ou.mongodb.net/Write_your_own_story?retryWrites=true&w=majority&appName=PersonalBlogging");
        console.log("Database Connected");

        await Post.insertMany(seedPosts);
        console.log("Posts seeded successfully!");
    } catch (err) {
        console.error("Error seeding the posts:", err);
    } finally {
        mongoose.connection.close();
    }
};

seedDatabase();
