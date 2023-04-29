import { catchAsyncError } from "./catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader == null) return next(new ErrorHandler("Not Logged In", 401));

    const token = authHeader.split(" ")[1];
    if (token == null) return next(new ErrorHandler("Not Logged In", 401));

    jwt.verify(token, process.env.JWT_SECRET, async (err, id) => {
        if (err) return res.sendStatus(403);
        req.user = await User.findById(id);
        next();
    });
});