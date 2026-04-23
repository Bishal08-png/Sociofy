import React from 'react'
import './ProfileSide.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../ProfileCard/ProfileCard'

const ProfileSide = () => {
  return (
    <div className='ProfileSide'>
      <LogoSearch />
      <ProfileCard location="homepage" />

      <div className="sidebar-footer">
        <span>Copyright 2026 Sociofy</span>
        <span>Created by <b>Bishal Dasgupta</b></span>
      </div>
    </div>
  )
}

export default ProfileSide
