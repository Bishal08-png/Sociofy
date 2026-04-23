import React, { useEffect, useState, useRef } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import axios from "axios";
import "./ChatBox.css";
import { API_BASE_URL, PUBLIC_FOLDER } from "../../api/config";

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage, setCurrentChat, chatUser }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [image, setImage] = useState(null);
  const scroll = useRef();
  const imageRef = useRef();

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

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === chat?._id) {
      setMessages((currentMessages) => [...currentMessages, receivedMessage]);
    }
  }, [chat?._id, receivedMessage]);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();

    let imageUrl = "";
    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);

      try {
        await axios.post(`${API_BASE_URL}/upload`, data);
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
    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessage(message);
      setMessages((currentMessages) => [...currentMessages, data]);
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
            <div className="follower" style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <span
                onClick={() => setCurrentChat(null)}
                style={{ cursor: "pointer", fontSize: "1rem", padding: "5px" }}
                title="Back to chats"
              >
                Back
              </span>
              {chatUser && (
                <>
                  <img
                    src={chatUser.profilePicture ? PUBLIC_FOLDER + chatUser.profilePicture : PUBLIC_FOLDER + "defaultProfile.png"}
                    alt="Profile"
                    className="followerImage"
                    style={{ width: "45px", height: "45px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.1)" }}
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
                className={message.senderId === currentUser ? "message own" : "message"}
              >
                <span>{message.text}</span>
                {message.image && (
                  <img src={`${PUBLIC_FOLDER}${message.image}`} alt="attached" className="message-image" />
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
