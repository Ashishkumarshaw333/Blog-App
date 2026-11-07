import React, { useState } from "react";
import api from "../api";

function PostCard({ post, currentUser, onUpdated, onDeleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const isOwner = currentUser && post.author && post.author._id === currentUser.id;

  async function handleUpdate() {
    try {
      const res = await api.put(`/posts/${post._id}`, { title, content });
      onUpdated(res.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Update error:", err);
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/posts/${post._id}`);
      onDeleted(post._id);
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  if (isEditing) {
    return (
      <article className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-3 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          rows={4}
        />
        <div className="mt-3 flex gap-2">
          <button onClick={handleUpdate} className="rounded-lg bg-green-600 px-3 py-1.5 font-medium text-white hover:bg-green-700">Save</button>
          <button onClick={() => setIsEditing(false)} className="rounded-lg border border-slate-300 px-3 py-1.5 hover:bg-slate-50">Cancel</button>
        </div>
      </article>
    );
  }

  return (
    <article className="mb-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="my-2 text-xs text-slate-500">
        by {post.author?.name || "Unknown"} · {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <p className="whitespace-pre-wrap break-words leading-relaxed text-slate-700">{post.content}</p>

      {isOwner && (
        <div className="mt-4 flex gap-2">
          <button onClick={() => setIsEditing(true)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium hover:bg-slate-50">Edit</button>
          <button onClick={handleDelete} className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">Delete</button>
        </div>
      )}
    </article>
  );
}

export default PostCard;
