import React from 'react'
import './Home.css'
import ProfileSide from '../../Components/profileSide/ProfileSide'
import PostSide from '../../Components/PostSide/PostSide'
import RightSide from '../../Components/RightSide/RightSide'
import LogoSearch from '../../Components/LogoSearch/LogoSearch'

const Home = () => {
  return (
    <div className="Home">
        <div className="mobile-header">
           <LogoSearch />
        </div>
        <ProfileSide />
        <PostSide />
        <RightSide />
    </div>
  )
}

export default Home
