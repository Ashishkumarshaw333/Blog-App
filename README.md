# Mini Blog (Multi-User Blog and Notes App)

Users can sign in and write posts. Posts from all users appear in one public feed, but users can only edit or delete their own posts.

## Tech Stack
- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Authentication:** JWT and bcrypt

## Features
- Sign up and log in with JWT authentication
- Public feed showing posts from all users
- Create, edit, and delete your own posts
- View other users' posts without being able to edit or delete them; ownership is enforced by both the frontend and backend

## Setup Instructions

### 1. Backend
```bash
cd backend
npm install
cp .env.example .env
```
Add your MongoDB Atlas `MONGO_URI` and a `JWT_SECRET` to `.env`.

```bash
npm run dev
```
The backend runs at `http://localhost:5002`.

### 2. Frontend
```bash
cd frontend
npm install
npm start
```
The app opens at `http://localhost:3000`.

**Tip:** To test Task Manager, Mini Shop, and Mini Blog at the same time, use separate browser tabs or incognito windows. They all use `localhost:3000`, so only one frontend can run there at a time. Their backends use different ports (`5000`, `5001`, and `5002`) and can run simultaneously.

## Project Structure
```
blog-app/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/auth.js
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        │   ├── Login.js
        │   ├── Register.js
        │   ├── Feed.js
        │   ├── PostForm.js
        │   └── PostCard.js
        └── App.js
```

## Important Concepts

### 1. Public and Protected Routes
In `routes/posts.js`, `GET /` is public, so anyone can view posts without signing in. The `POST`, `PUT`, and `DELETE` routes use `authMiddleware`, so only signed-in users can use them.

### 2. Ownership Checks
Being signed in is not enough; the backend also checks that a user is editing or deleting their own post:
```js
if (post.author.toString() !== req.userId) {
  return res.status(403).json({ message: "You can only edit your own posts." });
}
```
The backend check is essential for security. The frontend also hides the edit and delete buttons for posts owned by other users, but that is only a user-interface feature. API clients can bypass the frontend, so backend validation is required.

### 3. Mongoose `.populate()`
```js
Post.find().populate("author", "name")
```
A post document stores only the author's `ObjectId`. `.populate()` uses that ID to fetch the author's name and include it in the response, allowing the frontend to show who wrote the post.
