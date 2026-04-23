import React, { useEffect } from 'react';
import './Profile.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';
import MiniProfileCard from '../../Components/MiniProfileCard/MiniProfileCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';

const Profile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);

  // Fetch the specific user's posts whenever the URL parameter changes
  useEffect(() => {
    dispatch(getTimelinePosts(params.id || user._id));
  }, [params.id, user._id, dispatch]);

  const isOwner = !params.id || params.id === user._id;

  return (
    <div className='Profile'>
      {/* Left column: own profile info -or- logged-in user mini card */}
      {isOwner
        ? <ProfilePageLeft key={`left-${params.id || 'me'}`} />
        : <div className="profile-left-guest">
            <MiniProfileCard />
          </div>
      }

      <div className="ProfilePage-Center">
        <ProfileCard location="profilePage" key={`card-${params.id || 'me'}`} />
        <PostSide key={`post-${params.id || 'me'}`} />
      </div>

      <RightSide key={`right-${params.id || 'me'}`} />

    </div>
  )
}

export default Profile
