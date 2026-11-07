# Mini Blog App

A simple multi-user blog application where users can sign up, log in, create posts, and view a shared public feed. Users can only edit or delete their own posts.

## Tech Stack
- Frontend: React
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT + bcrypt

## Prerequisites
- Node.js
- MongoDB connection string
- npm

## Setup

### Backend
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5002
```
Run the backend:

```bash
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Features
- User registration and login
- Public blog feed
- Create, edit, and delete your own posts
- Post ownership enforcement on the backend
