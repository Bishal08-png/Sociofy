import React from 'react';
import './ProfilePageLeft.css';
import LogoSearch from '../LogoSearch/LogoSearch';
import InfoCard from '../InfoCard/InfoCard';

const ProfilePageLeft = () => {
  return (
    <div className='ProfilePageLeft'>
       <LogoSearch />
       <InfoCard />
    </div>
  )
}

export default ProfilePageLeft
