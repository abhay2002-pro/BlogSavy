import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/User.js";
import ErrorHandler from "../utils/errorHandler.js";
import bcrypt from "bcrypt";

export const register = catchAsyncError(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new ErrorHandler("Please enter all field", 400));
  }

  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User Already Exist", 409));

  const encryptedPassword = await bcrypt.hash(password, 10);
  await User.create({
    username, email,
    password: encryptedPassword,
  });

  res.status(201).json({
    status: true,
    message: "User created successfully",
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please enter all field", 400));

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("Incorrect Email or Password", 401));

  const isMatch = await user.comparePassword(password);

  if (!isMatch)
    return next(new ErrorHandler("Incorrect Email or Password", 401));

  const token = user.getJWTToken();
  const options = {
    expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(200)
    .cookie("token", token, options)
    .json({
      status: true,
      message: "Logged in successfully",
      token
    });
});

export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

export const getMyProfile = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user
  })
});

export const getUserById = catchAsyncError(async (req, res, next) => {
  const user_id = req.params;

  if (!user_id) {
    return next(new ErrorHandler("Please provide user id in parameters", 400));
  }

  const user = await User.findById(user_id.id);

  if (!user) return next(new ErrorHandler("Incorrect user Id", 401));

  res
    .status(200)
    .json({
      success: true,
      user
    });
});

export const updateUser = catchAsyncError(async (req, res, next) => {
  const user_id = req.params;

  if (!user_id) {
    return next(new ErrorHandler("Please provide user id in parameters", 400));
  }

  const user = await User.findById(user_id.id);

  if (!user) return next(new ErrorHandler("Incorrect user id", 401));

  if (!req.body.name && !req.body.email) {
    return next(new ErrorHandler("Please provide fields to update", 400));
  }

  if (req.body.name != null) user.name = req.body.name;
  if (req.body.email != null) user.email = req.body.email;

  await user.save();
  res
    .status(200)
    .json({
      success: true,
      message: "User updated sucessfully",
      user
    });
});

export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user_id = req.params;

  if (!user_id) {
    return next(new ErrorHandler("Please provide user id in parameters", 400));
  }

  await User.findByIdAndDelete(user_id.id)

  res
    .status(200)
    .json({
      success: true,
      message: "User deleted sucessfully",
    });
});