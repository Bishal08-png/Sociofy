import React, { useEffect, useState } from 'react';
import './Profile.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import ProfileCard from '../../Components/ProfileCard/ProfileCard';
import PostSide from '../../Components/PostSide/PostSide';
import RightSide from '../../Components/RightSide/RightSide';
import MiniProfileCard from '../../Components/MiniProfileCard/MiniProfileCard';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/PostAction';
import { getUser } from '../../api/UserRequest';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';

const Profile = () => {
  const { id: profileUserId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [profileUser, setProfileUser] = useState(null);

  // Fetch the specific user's posts whenever the URL parameter changes
  useEffect(() => {
    dispatch(getTimelinePosts(profileUserId || user._id));
  }, [profileUserId, user._id, dispatch]);

  useEffect(() => {
    const fetchProfileUser = async () => {
        if (profileUserId === user._id || !profileUserId) {
            setProfileUser(user);
        } else {
            const { data } = await getUser(profileUserId);
            setProfileUser(data);
        }
    };
    fetchProfileUser();
  }, [profileUserId, user]);

  const isOwner = !profileUserId || profileUserId === user._id;

  return (
    <div className='Profile'>
      <div className="mobile-header">
        <LogoSearch />
      </div>

      {/* Left column: own profile info -or- logged-in user mini card */}
      {isOwner
        ? <ProfilePageLeft key={`left-${profileUserId || 'me'}`} />
        : <div className="profile-left-guest">
            <MiniProfileCard />
          </div>
      }

      <div className="ProfilePage-Center">
        <ProfileCard location="profilePage" key={`card-${profileUserId || 'me'}`} />
        <PostSide key={`post-${profileUserId || 'me'}`} />
      </div>

      <RightSide key={`right-${profileUserId || 'me'}`} />

    </div>
  )
}

export default Profile
