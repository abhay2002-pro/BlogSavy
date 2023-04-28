import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide the title"],
  },
  content: {
    type: String,
    required: [true, "Please provide the description"],
    minLength: [20, "Content must be at least 20 characters"],
  },
  timestamp: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export const Blog = mongoose.model("Blog", schema);
