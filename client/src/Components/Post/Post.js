import React, { useState } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector, useDispatch } from 'react-redux';
import { likePost, addComment } from '../../api/PostRequest';
import { deletePost } from '../../actions/PostAction';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Post = ({ data }) => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(data.likes?.includes(user._id) || false)
  const [likes, setLikes] = useState(data.likes.length)
  const [comments, setComments] = useState(data.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const isOwner = user._id === data.userId;

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  const handleComment = async () => {
    if (!commentText.trim()) return;
    const commentData = {
      userId: user._id,
      text: commentText,
      name: user.firstname + " " + user.lastname,
      profilePicture: user.profilePicture || "defaultProfile.png"
    };
    try {
      const { data: newComment } = await addComment(data._id, commentData);
      setComments([...comments, newComment]);
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='Post'>

      <div className="postHeader">
        <img
          src={data.profilePicture ? serverPublic + data.profilePicture : serverPublic + "defaultProfile.png"}
          alt="avatar"
          className="postAuthorAvatar"
        />
        <div className="postAuthorInfo">
          <span className="postAuthorName">{data.name || "Unknown User"}</span>
        </div>
        {isOwner && (
          <div
            className="deletePostBtn"
            onClick={() => dispatch(deletePost(data._id, user._id))}
          >
            <DeleteOutlineIcon fontSize="small" />
          </div>
        )}
      </div>

      <img src={data.image ? serverPublic + data.image : ""} alt="" />

      <div className="detail">
        <span>{data.desc}</span>
      </div>

      <div className="postReact">
        <img src={liked ? Like : Notlike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
        <img src={Comment} alt="" style={{ cursor: "pointer" }} onClick={() => setShowComments(!showComments)} />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: '14px' }}>
        {likes} likes &nbsp;&nbsp; {comments.length} comments
      </span>

      {showComments && (
        <div className="commentsSection">
          <div className="commentsList">
            {comments.map((c, i) => (
              <div key={i} className="commentItem">
                <img src={serverPublic + c.profilePicture} alt="" className="commentAvatar" />
                <div className="commentBody">
                  <b>{c.name}</b>
                  <span>{c.text}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="commentInputContainer">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="commentInput"
            />
            <button className="button commentButton" onClick={handleComment}>
              Post
            </button>
          </div>
        </div>
      )}

    </div>
  )
}

export default Post