import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './MiniProfileCard.css';
import { resolveImageUrl } from '../../api/config';

const MiniProfileCard = () => {
    const { user } = useSelector((state) => state.authReducer.authData);

    return (
        <div className="MiniProfileCard">
            {/* Cover photo strip */}
            <div className="mini-cover">
                <img
                    src={resolveImageUrl(user.coverPicture, 'defaultCover.jpg')}
                    alt="cover"
                />
            </div>

            {/* Avatar */}
            <div className="mini-avatar-wrap">
                <img
                    src={resolveImageUrl(user.profilePicture, 'defaultProfile.png')}
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
