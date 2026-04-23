import React, { useEffect, useState } from 'react';
import './InfoCard.css';
import EditIcon from '@mui/icons-material/Edit';
import ProfileModal from '../ProfileModal/ProfileModal';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest.js';
import { logOut } from '../../actions/AuthAction';
import { followUser, unFollowUser } from '../../actions/UserAction';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(false);
  
  const [profileUser, setProfileUser] = useState(profileUserId && profileUserId !== user._id ? null : user);
  const [isLoading, setIsLoading] = useState(profileUserId && profileUserId !== user._id);

  useEffect(() => {
    const fetchProfileUser = async () => {
      // If we are on the home page (no ID) or viewing our own profile page
      if (!profileUserId || profileUserId === user._id) {
        setProfileUser(user);
        setIsLoading(false);
      } else {
        // Viewing someone else's profile
        setIsLoading(true);
        try {
          const fetchedUser = await UserApi.getUser(profileUserId);
          setProfileUser(fetchedUser);
        } catch (error) {
          console.log(error);
          setProfileUser(null);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProfileUser();
  }, [user, profileUserId]);

  useEffect(() => {
    if (!profileUser) return;
    setFollowing(profileUser.followers?.includes(user._id) || false);
  }, [profileUser, user._id]);

  const handleFollow = () => {
    following ? dispatch(unFollowUser(profileUser._id, user))
        : dispatch(followUser(profileUser._id, user));
    setFollowing((prev) => !prev);
  }

  const handleLogOut = () => {
    dispatch(logOut());
  }

  // Check if current view is the owner's profile
  const isOwner = !profileUserId || profileUserId === user._id;

  if (isLoading) return <div style={{textAlign: 'center', padding: '1rem', color: 'var(--gray)'}}>Loading info...</div>;
  if (!profileUser) return null;

  return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Profile Info</h4>
        {isOwner && (
          <div>
            <EditIcon 
              style={{cursor: 'pointer'}}
              onClick={() => setModalOpened(true)} 
            />
            <ProfileModal 
              modalOpened={modalOpened} 
              setModalOpened={setModalOpened}
              data={user}
              editMode="all"
            />
          </div>
        )}
      </div>

      <div className="info">
        <span><b>Relationship </b></span>
        <span>{profileUser.relationship || "Not mentioned"}</span>
      </div>

      <div className="info">
        <span><b>Lives in </b></span>
        <span>{[profileUser.livesin, profileUser.country].filter(Boolean).join(', ') || "Not mentioned"}</span>
      </div>

      <div className="info">
        <span><b>Works at </b></span>
        <span>{profileUser.worksAt || "Not mentioned"}</span>
      </div>

      {isOwner ? (
        <button className='button logout-button' onClick={handleLogOut}>Log Out</button>
      ) : (
        <button className='button fc-button' onClick={handleFollow}>
          {following ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  )
}

export default InfoCard;
