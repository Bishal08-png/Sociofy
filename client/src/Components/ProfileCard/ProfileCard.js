import React, { useState, useEffect } from 'react'
import './ProfileCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import ProfileModal from '../ProfileModal/ProfileModal';
import * as UserApi from '../../api/UserRequest.js';
import { followUser, unFollowUser } from '../../actions/UserAction';


const ProfileCard = ({ location }) => {

    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    
    const [modalOpened, setModalOpened] = useState(false);
    const [editMode, setEditMode] = useState("all");
    
    const params = useParams();
    const profileUserId = params.id;

    // Initial state avoids flashing the logged-in user's data when viewing someone else
    const [profileUser, setProfileUser] = useState(profileUserId && profileUserId !== user._id ? null : user);
    const [isLoading, setIsLoading] = useState(profileUserId && profileUserId !== user._id);

    useEffect(() => {
        const fetchProfileUser = async () => {
            if (profileUserId && profileUserId !== user._id) {
                setIsLoading(true);
                try {
                    const { data: fetchedUser } = await UserApi.getUser(profileUserId);
                    setProfileUser(fetchedUser);
                } catch (error) {
                    console.log(error);
                    setProfileUser(null);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setProfileUser(user);
                setIsLoading(false);
            }
        };
        fetchProfileUser();
    }, [user, profileUserId]);

    const isOwner = !profileUserId || profileUserId === user._id;

    // Derive following state from the logged-in user's following list
    const isFollowing = user.following?.includes(profileUser?._id) || false;

    const handleFollow = () => {
        isFollowing
            ? dispatch(unFollowUser(profileUser._id, user))
            : dispatch(followUser(profileUser._id, user));
    };

    const handleEditField = (mode) => {
        if (isOwner) {
            setEditMode(mode);
            setModalOpened(true);
        }
    }


    if (isLoading) return <div style={{textAlign: 'center', padding: '1rem', color: 'var(--gray)'}}>Loading profile...</div>;
    if (!profileUser) return <div style={{textAlign: 'center', padding: '1rem', color: 'var(--gray)'}}>User not found.</div>;

    return (
        <div className='ProfileCard'>

            <div className="ProfileImages">
                <img src={profileUser.coverPicture ? serverPublic + profileUser.coverPicture : serverPublic + "defaultCover.jpg"} alt="" />
                <img src={profileUser.profilePicture ? serverPublic + profileUser.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
            </div>

            <div className="ProfileName">
                <span 
                    style={{cursor: isOwner ? 'pointer' : 'default'}} 
                    onClick={() => handleEditField("name")}
                    title={isOwner ? "Click to edit name" : ""}
                >
                    {profileUser.firstname} {profileUser.lastname}
                </span>

                {profileUser.about && (
                    <span 
                        className="profile-detail" 
                        style={{cursor: isOwner ? 'pointer' : 'default', fontStyle: 'italic', opacity: 0.8}} 
                        onClick={() => isOwner && handleEditField("status")}
                        title={isOwner ? "Click to edit bio" : ""}
                    >
                        {profileUser.about}
                    </span>
                )}
                
                <span className="profile-detail">
                    {profileUser.worksAt ? profileUser.worksAt : (isOwner && (
                        <span className="add-info" onClick={() => handleEditField("job")}>Add job...</span>
                    ))}
                </span>
                
                <span className="profile-detail">
                    {[profileUser.livesin, profileUser.country].filter(Boolean).join(', ') ? [profileUser.livesin, profileUser.country].filter(Boolean).join(', ') : (isOwner && (
                        <span className="add-info" onClick={() => handleEditField("location")}>Add location...</span>
                    ))}
                </span>
                
                <span className="profile-detail">
                    {profileUser.relationship ? profileUser.relationship : (isOwner && (
                        <span className="add-info" onClick={() => handleEditField("status")}>Add status...</span>
                    ))}
                </span>
            </div>

            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>{profileUser.followers?.length || 0}</span>
                        <span>Followers</span>
                    </div>
                    <div className="vl"></div>
                    <div className="follow">
                        <span>{profileUser.following?.length || 0}</span>
                        <span>Following</span>
                    </div>

                    {location === "profilePage" && (
                        <>
                            <div className="vl"></div>
                            <div className="follow">
                                <span>{posts?.filter((post) => post.userId === profileUser._id)?.length || 0}</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}

                </div>
                <hr />
            </div>

            {/* Follow/Unfollow button — visible only when viewing someone else's profile */}
            {!isOwner && location === "profilePage" && (
                <button
                    className="button fc-button"
                    style={{ alignSelf: 'center', marginBottom: '1rem' }}
                    onClick={handleFollow}
                >
                    {isFollowing ? "Unfollow" : "Follow"}
                </button>
            )}

            {location === "profilePage" ? '' :
                <span>
                    <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>My Profile</Link>
                </span>
            }

            {isOwner && (
                <ProfileModal 
                    modalOpened={modalOpened} 
                    setModalOpened={setModalOpened} 
                    data={user}
                    editMode={editMode}
                />
            )}

        </div>
    )
}

export default ProfileCard
