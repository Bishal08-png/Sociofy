import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unFollowUser } from '../../actions/UserAction';
import { createChat } from '../../api/ChatRequest';
import { useNavigate } from 'react-router-dom';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { resolveImageUrl } from '../../api/config';



const UserFollow = ({ person }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authReducer.authData);

    // Derive follow status from global Redux state — auto-syncs everywhere
    const isFollowing = user.following?.includes(person._id) || false;
    const [messaging, setMessaging] = useState(false);


    const handleFollow = () => {
        isFollowing
            ? dispatch(unFollowUser(person._id, user))
            : dispatch(followUser(person._id, user));
    }

    const handleMessage = async () => {
        setMessaging(true);
        try {
            // Create or fetch existing chat between the two users
            await createChat({ senderId: user._id, receiverId: person._id });
        } catch (error) {
            console.log(error);
        }
        navigate('/chat');
        setMessaging(false);
    }

    return (
        <div className="follower">

            <div>
                <img src={resolveImageUrl(person.profilePicture, "defaultProfile.png")} alt="" className='followerImg' />
                <div className="name">
                    <span>{person.firstname}</span>
                    <span>@{person.firstname}  {person.lastname}</span>
                </div>
            </div>

            <div className="follower-buttons">
                {isFollowing && (
                    <button
                        className='button fc-button msg-button'
                        onClick={handleMessage}
                        disabled={messaging}
                        title="Send Message"
                    >
                        <ChatBubbleOutlineIcon style={{ fontSize: '18px' }} />
                    </button>
                )}
                <button className={isFollowing ? 'button fc-button unfollow-btn' : 'button fc-button'} onClick={handleFollow}>
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            </div>

        </div>

    )
}

export default UserFollow
