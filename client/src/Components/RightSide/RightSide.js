import React, { useState } from 'react';
import './RightSide.css';
import ShareModal from '../ShareModal/ShareModal';
import ProfileModal from '../ProfileModal/ProfileModal';
import FollowersCard from '../FollowersCard/FollowersCard';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// MUI Icons
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

const RightSide = () => {
    const [modalOpened, setModalOpened] = useState(false);
    const [profileModalOpened, setProfileModalOpened] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className='RightSide'>
            <div className="navIcons">
                <Link to='../home'>
                    <HomeIcon className="nav-icon" />
                </Link>

                <SettingsIcon 
                    className="nav-icon" 
                    onClick={() => setProfileModalOpened(true)} 
                    style={{ cursor: 'pointer' }}
                />
                
                <NotificationsIcon className="nav-icon" />

                <Link to='../chat'>
                    <QuestionAnswerIcon className="nav-icon" />
                </Link>
            </div>

            <ProfileModal 
                modalOpened={profileModalOpened} 
                setModalOpened={setProfileModalOpened} 
                data={user}
                editMode="all"
            />

            <div className="button rg-button" onClick={() => setModalOpened(true)}>
                Share
            </div>
            <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

            {/* "People you may know..." moved here */}
            <FollowersCard />

        </div>
    )
}

export default RightSide
