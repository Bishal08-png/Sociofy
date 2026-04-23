import React, { useRef, useState, useEffect } from "react";
import ChatBox from "../../Components/ChatBox/ChatBox";
import LogoSearch from "../../Components/LogoSearch/LogoSearch";
import "./Chat.css";
import { userChats } from "../../api/ChatRequest";
import axios from "axios";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { API_BASE_URL, PUBLIC_FOLDER } from "../../api/config";

const Chat = () => {
  const socket = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);
  // Map chatId -> other user's profile info
  const [chatUsers, setChatUsers] = useState({});

  // Get all chats for this user
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);

        // Deduplicate chats to ensure only one conversation per unique user
        const uniqueChatsMap = data.reduce((acc, chat) => {
          const otherId = chat.members.find((id) => id !== user._id);
          if (otherId) {
            // Keep the most recently updated chat
            if (!acc[otherId] || new Date(chat.updatedAt || chat.createdAt) > new Date(acc[otherId].updatedAt || acc[otherId].createdAt)) {
              acc[otherId] = chat;
            }
          }
          return acc;
        }, {});

        // Convert back to array and sort by latest activity
        const uniqueChats = Object.values(uniqueChatsMap).sort(
          (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
        );

        setChats(uniqueChats);

        // For each chat, fetch the other user's info to display their name/avatar
        const userMap = {};
        await Promise.all(
          uniqueChats.map(async (chat) => {
            const otherId = chat.members.find((id) => id !== user._id);
            if (otherId) {
              try {
                const { data: otherUser } = await axios.get(`${API_BASE_URL}/user/${otherId}`);
                userMap[chat._id] = otherUser;
              } catch (e) {
                console.log(e);
              }
            }
          })
        );
        setChatUsers(userMap);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user._id]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io(API_BASE_URL);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // Send Message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // Get message from socket server
  useEffect(() => {
    socket.current?.on("receive-message", (data) => {
      setReceivedMessage(data);
    });
  }, []);

  const serverPublic = PUBLIC_FOLDER;

  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.length === 0 && (
              <p className="no-chats-msg">No conversations yet. Follow someone and start chatting!</p>
            )}
            {chats.map((chat) => {
              const otherUser = chatUsers[chat._id];
              const isOnline = onlineUsers.some(
                (u) => u.userId === chat.members.find((id) => id !== user._id)
              );
              return (
                <div
                  key={chat._id}
                  className={`conversation-item ${currentChat?._id === chat._id ? "active-chat" : ""}`}
                  onClick={() => setCurrentChat(chat)}
                >
                  <div className="conv-avatar-wrap">
                    <img
                      src={
                        otherUser?.profilePicture
                          ? serverPublic + otherUser.profilePicture
                          : serverPublic + "defaultProfile.png"
                      }
                      alt=""
                      className="conv-avatar"
                    />
                    {isOnline && <span className="online-dot" />}
                  </div>
                  <div className="conv-info">
                    <span className="conv-name">
                      {otherUser
                        ? otherUser.firstname + " " + otherUser.lastname
                        : "Loading..."}
                    </span>
                    <span className="conv-preview">Click to open chat</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="Right-side-chat">
        <ChatBox
          chat={currentChat}
          currentUser={user._id}
          setSendMessage={setSendMessage}
          receivedMessage={receivedMessage}
          setCurrentChat={setCurrentChat}
          chatUser={currentChat ? chatUsers[currentChat._id] : null}
        />
      </div>
    </div>
  );
};

export default Chat;
