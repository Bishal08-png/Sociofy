# Bishal Social

Bishal Social is my full-stack social media web app built with the MERN stack.
It includes authentication, profiles, image posts, comments, likes, following,
real-time chat, online presence, and chat image sharing.

## Tech Stack

- React 18
- Redux and Redux Thunk
- React Router
- Node.js and Express
- MongoDB with Mongoose
- Socket.IO
- JWT authentication
- Multer image uploads

## Features

- Secure signup and login with JWT and bcrypt.
- Create posts with captions and image uploads.
- Like, unlike, comment on, and delete posts.
- Follow and unfollow users.
- Edit profile details, avatar, cover photo, and bio.
- Real-time direct messaging with online user status.
- Send images inside chat conversations.
- Dark glassmorphism UI with custom styling.

## Run Locally

### Backend

Create `Server/.env`:

```env
PORT=4000
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_secret_key
```

Then run:

```bash
cd Server
npm install
npm start
```

### Frontend

Create `client/.env`:

```env
REACT_APP_PUBLIC_FOLDER=http://localhost:4000/images/
```

Then run:

```bash
cd client
npm install
npm start
```

The frontend runs on `http://localhost:3000` and the backend runs on
`http://localhost:4000`.

## Production Build

The backend can serve the React production build locally or on a Node host:

```bash
cd client
npm run build

cd ../Server
node index.js
```

Then open `http://localhost:4000`.

## Deploy

### Frontend on Vercel

This repo includes `vercel.json`, so Vercel can build the React app from the
`client` folder.

Set these Vercel environment variables:

```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_PUBLIC_FOLDER=https://your-backend-url.com/images/
```

Then import the GitHub repository in Vercel and deploy.

### Backend

The Express and Socket.IO backend needs a Node server host. Use a service that
supports long-running Node processes and WebSockets, then set:

```env
PORT=4000
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_secret_key
CLIENT_URL=https://your-vercel-app.vercel.app
```

Vercel is excellent for the React frontend, but Socket.IO needs a backend host
with WebSocket support for real-time chat.

## Project Structure

```text
client/
  public/
  src/
    actions/
    api/
    Components/
    Pages/
    reducers/

Server/
  Controllers/
  Middleware/
  Models/
  Routes/
  public/images/
  index.js
```

## Author

Created by Bishal Dasgupta.
