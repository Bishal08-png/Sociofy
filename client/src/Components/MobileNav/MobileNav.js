import React from 'react';
import './MobileNav.css';
import { Link, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

const MobileNav = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.authReducer.authData);

    if (!user) return null;

    return (
        <div className="MobileNav">
            <Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>
                <HomeIcon />
                <span>Home</span>
            </Link>

            <Link to="/discover" className={location.pathname === '/discover' ? 'active' : ''}>
                <GroupIcon />
                <span>People</span>
            </Link>
            
            <Link to={`/profile/${user._id}`} className={location.pathname.includes('/profile') ? 'active' : ''}>
                <PersonIcon />
                <span>Profile</span>
            </Link>

            <Link to="/notifications" className={location.pathname === '/notifications' ? 'active' : ''}>
                <NotificationsIcon />
                <span>Alerts</span>
            </Link>

            <Link to="/chat" className={location.pathname === '/chat' ? 'active' : ''}>
                <QuestionAnswerIcon />
                <span>Chat</span>
            </Link>
        </div>
    );
};

export default MobileNav;
