import React, { useState } from "react";
import api from "../api";

function PostForm({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim() || !content.trim()) return;

    try {
      const res = await api.post("/posts", { title, content });
      onPostCreated(res.data);
      setTitle("");
      setContent("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while creating the post.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Write a New Post</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        required
      />
      <textarea
        placeholder="What would you like to share?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        rows={4}
        required
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" className="self-start rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700">
        Publish Post
      </button>
    </form>
  );
}

export default PostForm;
