import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js';
import UserRoute from './Routes/UserRoute.js';
import PostRoute from './Routes/PostRoute.js';
import UploadRoute from './Routes/UploadRoute.js';
import ChatRoute from './Routes/ChatRoute.js';
import MessageRoute from './Routes/MessageRoute.js';
import { Server } from 'socket.io';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// Routes
const app = express();
const httpServer = http.createServer(app);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.resolve(__dirname, '..', 'client', 'build');
const port = process.env.PORT || 4000;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:3000,http://localhost:4000')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins
    }
});


// to serve images for public (public folder)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));


// MiddleWare
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(new Error('Not allowed by CORS'));
    }
}));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

mongoose.connect
    (process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() =>
        httpServer.listen(port, () => console.log(`listening at ${port}`))
    ).catch((error) =>
        console.error(error)
    )

let activeUsers = [];

io.on("connection", (socket) => {
    socket.on("new-user-add", (newUserId) => {
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({ userId: newUserId, socketId: socket.id });
        }
        io.emit("get-users", activeUsers);
    });

    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
        io.emit("get-users", activeUsers);
    });

    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId);
        if (user) {
            io.to(user.socketId).emit("receive-message", data);
        }
    });
});


// uses of routes

app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

if (fs.existsSync(clientBuildPath)) {
    app.use(express.static(clientBuildPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}
