const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name").sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.userId }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    const post = await Post.create({ title, content, author: req.userId });
    await post.populate("author", "name");

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only edit your own posts." });
    }

    const { title, content } = req.body;
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;

    await post.save();
    await post.populate("author", "name");

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: "You can only delete your own posts." });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
