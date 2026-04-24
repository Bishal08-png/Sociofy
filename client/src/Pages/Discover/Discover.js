import React from 'react';
import './Discover.css';
import FollowersCard from '../../Components/FollowersCard/FollowersCard';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';
import ProfileSide from '../../Components/profileSide/ProfileSide';
import RightSide from '../../Components/RightSide/RightSide';

const Discover = () => {
    return (
        <div className="Home">
            <div className="mobile-header">
                <LogoSearch />
            </div>
            <ProfileSide />
            
            <div className="PostSide">
                <div className="Discover-container">
                    <FollowersCard />
                </div>
            </div>

            <RightSide />
        </div>
    );
};

export default Discover;
