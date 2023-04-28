import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.isEmail,
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],
  access_token: String,
});

schema.methods.getJWTToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
};

export const User = mongoose.model("User", schema);
