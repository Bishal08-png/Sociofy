import postModel from '../Models/postModel.js';
import mongoose from 'mongoose';
import UserModel from "../Models/userModel.js";


// Create new post
export const createPost = async (req, res) => {
    try {
        const user = await UserModel.findById(req.body.userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const newPost = new postModel({
            ...req.body,
            name: user.firstname + " " + user.lastname,
            profilePicture: user.profilePicture || "defaultProfile.png"
        });

        await newPost.save();
        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}


// get a post
export const getPost = async (req, res) => {
    const id = req.params.id

    try {
        const post = await postModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}


//Update a Post
export const updatePost = async (req, res) => {
    const postId = req.params.id

    const { userId } = req.body

    try {
        const post = await postModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post Updated Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}



// delete a post
export const deletePost = async (req, res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (post.userId === userId) {
            await post.deleteOne();
            res.status(200).json("Post deleted Successfully!")
        } else {
            res.status(403).json("Action forbidden")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}


// Like/Dislike a Post

export const like_dislike_Post = async (req, res) => {
    const id = req.params.id;

    const { userId } = req.body;

    try {
        const post = await postModel.findById(id);
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked.")
        } else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post unliked.")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}


// Add a Comment
export const addCommentPost = async (req, res) => {
    const id = req.params.id;
    const { userId, text, name, profilePicture } = req.body;

    try {
        const post = await postModel.findById(id);
        const newComment = {
            userId,
            text,
            name,
            profilePicture,
            createdAt: new Date().toISOString()
        };
        await post.updateOne({ $push: { comments: newComment } });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json(error);
    }
};


// Get timeline Posts
export const timeline = async (req, res) => {
    const userId = req.params.id;

    try {
        const currentUserPosts = await postModel.find({ userId: userId });
        const followingUserPosts = await UserModel.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingUserPosts"
                }
            },
            { $project: { followingUserPosts: 1, _id: 0 } }
        ]);

        const allPosts = currentUserPosts.concat(...followingUserPosts[0].followingUserPosts);

        // Enrich each post with the poster's name and profilePicture
        const enrichedPosts = await Promise.all(
            allPosts.map(async (post) => {
                const postObj = post.toObject ? post.toObject() : post;
                if (!postObj.name || !postObj.profilePicture || postObj.profilePicture === "defaultProfile.png") {
                    const postUser = await UserModel.findById(postObj.userId);
                    if (postUser) {
                        postObj.name = postUser.firstname + " " + postUser.lastname;
                        postObj.profilePicture = postUser.profilePicture || "defaultProfile.png";
                    }
                }
                return postObj;
            })
        );

        res.status(200).json(enrichedPosts.sort((a, b) => b.createdAt - a.createdAt));

    } catch (error) {
        res.status(500).json(error)
    }
};