import React, { useEffect, useState, useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import axios from "axios";
import "./ChatBox.css";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, setCurrentChat, chatUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const scroll = useRef();
  const imageRef = useRef();

  // fetching data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Receive Message from parent component
  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  // Send Message
  const handleSend = async (e) => {
    e.preventDefault();
    
    // image upload
    let imageUrl = "";
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      try {
        await axios.post("http://localhost:4000/upload", data);
        imageUrl = fileName;
      } catch (err) {
        console.log(err);
      }
    }

    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
      image: imageUrl
    };

    const receiverId = chat.members.find((id) => id !== currentUser);
    
    // send message to socket server
    setSendMessage({ ...message, receiverId });
    
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ChatBox-container">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="follower" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span 
                onClick={() => setCurrentChat(null)} 
                style={{ cursor: 'pointer', fontSize: '1.5rem', padding: '5px' }}
                title="Back to chats"
              >
                ⬅️
              </span>
              {chatUser && (
                <>
                  <img 
                    src={chatUser.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + chatUser.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} 
                    alt="Profile" 
                    className="followerImage" 
                    style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.1)' }} 
                  />
                  <div className="name" style={{ fontSize: "1.1rem", fontWeight: "600" }}>
                    <span>{chatUser.firstname} {chatUser.lastname}</span>
                  </div>
                </>
              )}
            </div>
            <hr style={{ width: "95%", border: "0.1px solid var(--glassBorder)", marginTop: "15px", marginBottom: "5px" }} />
          </div>

          <div className="chat-body">
            {messages.map((message) => (
              <div
                ref={scroll}
                key={message._id}
                className={
                  message.senderId === currentUser
                    ? "message own"
                    : "message"
                }
              >
                <span>{message.text}</span>
                {message.image && (
                   <img src={`http://localhost:4000/images/${message.image}`} alt="attached" className="message-image" />
                )}
                <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
          
          <div className="chat-sender">
            <div onClick={() => imageRef.current.click()}>+ Photo</div>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => handleChange(e.target.value)}
              placeholder="Message"
            />
            {image && <div className="img-preview">{image.name} <span>(ready)</span></div>}
            <div className="send-button button" onClick={handleSend}>Send</div>
            <input
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </div>
  );
};

export default ChatBox;
