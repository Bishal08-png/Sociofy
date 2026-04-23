<div align="center">
  <img src="client/src/Img/logo.png" alt="Sociofy Logo" width="80" />
  <h1>Sociofy</h1>
  <p><strong>A premium, full-stack social media platform built with the MERN stack</strong></p>
  <p>
    <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
    <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
    <img src="https://img.shields.io/badge/Socket.IO-Real--time-010101?style=for-the-badge&logo=socket.io&logoColor=white" />
    <img src="https://img.shields.io/badge/Redux-State_Management-764ABC?style=for-the-badge&logo=redux&logoColor=white" />
  </p>
</div>

---

## ✨ Features

- 🔐 **Authentication** — Secure Sign Up & Login with JWT tokens and bcrypt password hashing
- 📝 **Posts** — Create posts with text captions and image uploads. Post author name & avatar shown on every post.
- 💬 **Comments** — Expand the comment section on any post to read and write comments in real-time
- ❤️ **Like / Unlike** — React to posts instantly without page reloads
- 🗑️ **Delete Posts** — Authors can delete their own posts directly from the feed
- 👥 **Follow / Unfollow** — Follow other users to see their posts in your timeline
- 💌 **Direct Messaging** — Start a chat with any user you follow. Real-time messages powered by **Socket.IO**
- 📷 **Photo Sharing in Chat** — Attach and send images directly inside chat conversations
- 🟢 **Online Presence** — See who is online in real time in your chat sidebar
- 🎨 **Premium Dark UI** — Glassmorphism design system with violet-to-blue gradient accents
- 👤 **Profile Page** — View & edit your profile, cover photo, and bio

---

## 🖼️ Screenshots

| Auth Page | Home Feed | Chat |
|-----------|-----------|------|
| Sign Up / Login with branded Sociofy panel | Posts feed with author info, likes and comments | Real-time DMs with photo sharing |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Redux + Redux Thunk | Global State Management |
| React Router DOM v6 | Client-side Routing |
| Material UI (MUI) | Icons |
| Socket.IO Client | Real-time Messaging |
| Axios | HTTP Requests |
| CSS Variables + Glassmorphism | Custom Design System |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API Server |
| MongoDB + Mongoose | Database & ODM |
| Socket.IO | WebSocket Real-time Events |
| JSON Web Tokens (JWT) | Authentication |
| Bcrypt | Password Hashing |
| Multer | Image Upload Middleware |
| Dotenv | Environment Configuration |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- A code editor like [VS Code](https://code.visualstudio.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/sociofy.git
cd sociofy
```

### 2. Configure Backend Environment

Create a `.env` file inside the `Server/` directory:

```env
PORT=4000
MONGO_DB=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/sociofy
JWT_KEY=your_secret_jwt_key
```

### 3. Install & Run the Backend

```bash
cd Server
npm install
npm start
```

> The server will start on `http://localhost:4000`

### 4. Configure Frontend Environment

Create a `.env` file inside the `client/` directory:

```env
REACT_APP_PUBLIC_FOLDER=http://localhost:4000/images/
```

### 5. Install & Run the Frontend

```bash
cd client
npm install
npm start
```

> The React app will open at `http://localhost:3000`

---

## 📁 Project Structure

```
sociofy/
├── client/                     # React Frontend
│   ├── public/
│   └── src/
│       ├── actions/            # Redux action creators
│       ├── api/                # Axios API request helpers
│       ├── Components/         # Reusable UI components
│       │   ├── Post/           # Post card + comments + delete
│       │   ├── PostShare/      # Create new post form
│       │   ├── ChatBox/        # DM chat window with photo upload
│       │   ├── UserFollow/     # Follow card with Message button
│       │   └── ...
│       ├── Pages/
│       │   ├── auth/           # Login & Register page
│       │   ├── home/           # Main feed
│       │   ├── profile/        # User profile
│       │   └── Chat/           # Messaging page
│       ├── reducers/           # Redux reducers
│       └── App.js
│
└── Server/                     # Node.js + Express Backend
    ├── Controllers/            # Business logic
    ├── Models/                 # Mongoose schemas
    ├── Routes/                 # Express route definitions
    └── index.js                # App entry point with Socket.IO
```

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login user |
| GET | `/user/:id` | Get user profile |
| PUT | `/user/:id` | Update user profile |
| PUT | `/user/:id/follow` | Follow a user |
| PUT | `/user/:id/unfollow` | Unfollow a user |
| POST | `/post` | Create a post |
| GET | `/post/:id/timeline` | Get timeline posts |
| PUT | `/post/:id/like_dislike` | Like or unlike a post |
| PUT | `/post/:id/comment` | Add a comment |
| DELETE | `/post/:id` | Delete a post |
| POST | `/chat` | Create/start a chat |
| GET | `/chat/:userId` | Get all chats for a user |
| GET | `/chat/find/:firstId/:secondId` | Find a chat between two users |
| POST | `/message` | Send a message |
| GET | `/message/:chatId` | Get messages for a chat |
| POST | `/upload` | Upload an image file |

---

## ⚡ Real-time Events (Socket.IO)

| Event | Direction | Description |
|-------|-----------|-------------|
| `new-user-add` | Client → Server | Register user as online |
| `get-users` | Server → Client | Broadcast online users list |
| `send-message` | Client → Server | Send a DM to another user |
| `receive-message` | Server → Client | Push incoming DM to receiver |
| `disconnect` | Client → Server | Remove user from online list |

---

## 🎨 Design System

Sociofy uses a custom **Dark Mode Glassmorphism** design system built with CSS variables:

- **Background**: Deep navy `#0F111A`
- **Cards**: Translucent `rgba(255,255,255,0.05)` with `backdrop-filter: blur(16px)`
- **Accent**: Violet → Blue gradient `linear-gradient(135deg, #a78bfa, #60a5fa)`
- **Typography**: [Outfit](https://fonts.google.com/specimen/Outfit) from Google Fonts

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ using the MERN Stack</sub>
</div>