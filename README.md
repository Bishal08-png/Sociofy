# Sociofy

Sociofy is my full-stack social media web app built with the MERN stack.
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

### Deploy on Render (Recommended)

This repo includes `render.yaml` for a one-click deploy on [Render](https://render.com).
The backend serves the built React frontend as a single unified web service.

1. Push this repo to GitHub.
2. Go to [render.com](https://render.com) → **New** → **Blueprint** → connect your repo.
3. Render reads `render.yaml` automatically.
4. Set these **Environment Variables** in the Render dashboard for your service:

| Variable | Value |
|---|---|
| `MONGO_DB` | Your MongoDB Atlas connection string |
| `JWT_KEY` | A long random secret string |
| `CLIENT_URL` | Your Render service URL (e.g. `https://sociofy.onrender.com`) |

5. Click **Deploy**. Render will install dependencies, build the React app, and start the Express server.
6. Once deployed, open `https://your-service.onrender.com`.

> **Note:** Render's free tier spins down after inactivity. Uploaded images are stored on an ephemeral filesystem and will be lost on redeploy. For persistent image storage, integrate a cloud storage service like Cloudinary or AWS S3.

### Manual Build (Self-Hosting / VPS)

```bash
# 1. Build the React frontend
cd client && npm install && npm run build

# 2. Start the backend (it serves the React build)
cd ../Server && npm install && node index.js
```

Set environment variables in `Server/.env`:

```env
PORT=4000
MONGO_DB=your_mongodb_connection_string
JWT_KEY=your_secret_key
CLIENT_URL=https://your-domain.com
```

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
