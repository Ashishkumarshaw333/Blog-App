import React, { useState, useEffect } from "react";
import api from "../api";
import PostForm from "./PostForm";
import PostCard from "./PostCard";

function Feed({ currentUser, onLogout }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err.response?.data?.message || "Could not load posts. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handlePostCreated(newPost) {
    setPosts((currentPosts) => [newPost, ...currentPosts]);
  }

  function handlePostUpdated(updatedPost) {
    setPosts((currentPosts) =>
      currentPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
    );
  }

  function handlePostDeleted(deletedId) {
    setPosts((currentPosts) => currentPosts.filter((post) => post._id !== deletedId));
  }

  function handleLogout() {
    localStorage.removeItem("token");
    onLogout();
  }

  return (
    <div className="mx-auto max-w-2xl font-sans">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Mini Blog</h2>
        <div>
          <span className="mr-2">Hello, {currentUser.name}</span>
          <button
            onClick={handleLogout}
            className="cursor-pointer rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
          >
            Logout
          </button>
        </div>
      </div>

      <PostForm onPostCreated={handlePostCreated} />

      <h3 className="my-4 text-lg font-semibold">Public Feed</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p>{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-2 rounded bg-red-700 px-3 py-1.5 text-white hover:bg-red-800"
          >
            Try again
          </button>
        </div>
      ) : posts.length === 0 ? (
        <p>No posts yet. Write the first one!</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            currentUser={currentUser}
            onUpdated={handlePostUpdated}
            onDeleted={handlePostDeleted}
          />
        ))
      )}
    </div>
  );
}

export default Feed;
