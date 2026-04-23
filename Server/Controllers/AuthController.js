import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// register new users
export const registerUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            return res.status(400).json({ message: "This User already exists!" })
        }

        const hashedPass = await bcrypt.hash(password.toString(), 10);
        req.body.password = hashedPass;

        const newUser = new UserModel(req.body);

        const user = await newUser.save();

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Login users

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log("--- Login Debug ---");
    console.log("Login attempt received:", { email, password });

    try {
        const user = await UserModel.findOne({ email: email });
        console.log("Database user lookup result:", user);

        if (user) {
            const validity = await bcrypt.compare(password.toString(), user.password)
            console.log("Bcrypt password compare result:", validity);

            if (!validity) {
                res.status(400).json("Incorrect password");
            } else {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
                res.status(200).json({ user, token });
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: error.message })
    }
}