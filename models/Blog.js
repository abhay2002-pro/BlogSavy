import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Blog = mongoose.model("Blog", schema);
