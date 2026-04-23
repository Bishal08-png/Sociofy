import React from 'react'
import './PostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PostSide = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const isOwner = !params.id || params.id === user._id;
  return (
    <div className="PostSide">
        {isOwner && <PostShare />}
        <Posts />
    </div>
  )
}

export default PostSide
