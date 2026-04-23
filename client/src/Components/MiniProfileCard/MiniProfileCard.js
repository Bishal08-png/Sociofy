import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MiniProfileCard.css';

const MiniProfileCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="MiniProfileCard">
            {/* Cover photo strip */}
            <div className="mini-cover">
                <img
                    src={user.coverPicture
                        ? serverPublic + user.coverPicture
                        : serverPublic + 'defaultCover.jpg'}
                    alt="cover"
                />
            </div>

            {/* Avatar */}
            <div className="mini-avatar-wrap">
                <img
                    src={user.profilePicture
                        ? serverPublic + user.profilePicture
                        : serverPublic + 'defaultProfile.png'}
                    alt="avatar"
                    className="mini-avatar"
                />
            </div>

            {/* Name & handle */}
            <div className="mini-info">
                <span className="mini-name">{user.firstname} {user.lastname}</span>
                {user.worksAt && (
                    <span className="mini-sub">{user.worksAt}</span>
                )}
                <div className="mini-stats">
                    <div>
                        <span>{user.followers?.length || 0}</span>
                        <span>Followers</span>
                    </div>
                    <div className="mini-vl" />
                    <div>
                        <span>{user.following?.length || 0}</span>
                        <span>Following</span>
                    </div>
                </div>
            </div>

            <Link to={`/profile/${user._id}`} className="mini-profile-btn button">
                My Profile
            </Link>
        </div>
    );
};

export default MiniProfileCard;
