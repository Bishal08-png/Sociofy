import UserModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const normalizeEmail = (email = "") => email.trim().toLowerCase();

const sanitizeUser = (user) => {
    const userObject = user.toObject ? user.toObject() : { ...user };
    delete userObject.password;
    return userObject;
};

// register new users
export const registerUser = async (req, res) => {

    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    try {
        const oldUser = await UserModel.findOne({ email: normalizedEmail });

        if (oldUser) {
            return res.status(400).json({ message: "This User already exists!" })
        }

        const hashedPass = await bcrypt.hash(password.toString(), 10);
        req.body.password = hashedPass;
        req.body.email = normalizedEmail;

        const newUser = new UserModel(req.body);

        const user = await newUser.save();

        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);

        res.status(200).json({ user: sanitizeUser(user), token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// Login users

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    try {
        const user = await UserModel.findOne({ email: normalizedEmail });

        if (user) {
            const validity = await bcrypt.compare(password.toString(), user.password)

            if (!validity) {
                res.status(400).json("Incorrect password");
            } else {
                const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_KEY);
                res.status(200).json({ user: sanitizeUser(user), token });
            }
        } else {
            res.status(404).json("User not found");
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
