import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Blog } from "../models/Blog.js";

export const createBlog = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    console.log(user);
    const { title, content } = req.body;

    await Blog.create({
        title, content, author: user.id
    })
    res.status(201).send({
        "success": "true",
        "message": "Blog created successfully"
    })
})