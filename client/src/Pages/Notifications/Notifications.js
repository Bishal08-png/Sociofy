import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import './Notifications.css';
import { API_BASE_URL } from '../../api/config';
import { format } from 'timeago.js';
import LogoSearch from '../../Components/LogoSearch/LogoSearch';
import ProfileSide from '../../Components/profileSide/ProfileSide';
import RightSide from '../../Components/RightSide/RightSide';

// Icons
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const Notifications = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/notification/${user._id}`);
        setNotifications(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user._id]);

  const markAsRead = async (id) => {
    try {
      await axios.put(`${API_BASE_URL}/notification/${id}/read`);
      setNotifications(notifications.map(n => n._id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.log(error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'follow': return <PersonAddIcon style={{ color: '#4ade80' }} />;
      case 'message': return <MessageIcon style={{ color: '#60a5fa' }} />;
      case 'like': return <FavoriteIcon style={{ color: '#f87171' }} />;
      case 'comment': return <CommentIcon style={{ color: '#fbbf24' }} />;
      default: return null;
    }
  };

  return (
    <div className="Home">
       <div className="mobile-header">
           <LogoSearch />
       </div>
       <ProfileSide />
       
       <div className="PostSide">
           <div className="Notifications-container">
               <h2>Alerts & Notifications</h2>
               
               {loading ? (
                   <p className="notif-status">Loading alerts...</p>
               ) : notifications.length === 0 ? (
                   <p className="notif-status">No new alerts. Stay tuned!</p>
               ) : (
                   <div className="notif-list">
                       {notifications.map((n) => (
                           <div 
                               key={n._id} 
                               className={`notif-item ${n.isRead ? 'read' : 'unread'}`}
                               onClick={() => !n.isRead && markAsRead(n._id)}
                           >
                               <div className="notif-icon-wrap">
                                   {getIcon(n.type)}
                               </div>
                               <div className="notif-content">
                                   <p>
                                       <strong>{n.senderName}</strong>{' '}
                                       {n.type === 'follow' && 'started following you'}
                                       {n.type === 'message' && 'sent you a message'}
                                       {n.type === 'like' && 'liked your post'}
                                       {n.type === 'comment' && 'commented on your post'}
                                   </p>
                                   <span className="notif-time">{format(n.createdAt)}</span>
                               </div>
                               {!n.isRead && <div className="unread-dot" />}
                           </div>
                       ))}
                   </div>
               )}
           </div>
       </div>

       <RightSide />
    </div>
  );
};

export default Notifications;
