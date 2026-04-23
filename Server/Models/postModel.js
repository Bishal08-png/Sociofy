import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
        userId: { type: String, required: true },
        desc: String,
        likes: [],
        comments: { type: Array, default: [] },
        image: String,
        name: String,
        profilePicture: String
    },
    {
        timestamps: true,
    }
)

const postModel = mongoose.model("Posts", postSchema);

export default postModel