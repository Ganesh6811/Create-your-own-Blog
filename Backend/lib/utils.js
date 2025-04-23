import jwt from "jsonwebtoken";

const generateToken = async (userData, res) => {
    const token = jwt.sign(
        { id: userData._id, email: userData.email },
        process.env.JWT_SECREATE_KEY,
        { expiresIn: "7d" },
    )

    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,             
        sameSite: "None",
        httpOnly: true,
    });

}

export default generateToken;
