import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { Blog } from "../models/Blog.js";

export const getBlogsOfASingleUser = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const blogs = await Blog.find({ "author": user.id });
    res.status(201).send({
        "success": "true",
        blogs
    })
})

export const createBlog = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const { title, content } = req.body;

    if (!title || !content) {
        return next(new ErrorHandler("Please enter all field", 400));
    }

    await Blog.create({
        title, content, author: user.id
    })

    res.status(201).send({
        "success": "true",
        "message": "Blog created successfully"
    })
})

export const getBlogById = catchAsyncError(async (req, res, next) => {
    const user = req.user;
    const blog_id = req.params.id;

    if (!blog_id) {
        return next(new ErrorHandler("Please provide blog id in parameters", 400));
    }

    const blog = await Blog.findById(blog_id);

    if (!blog) {
        return next(new ErrorHandler("Incorrect blog id", 401));
    }

    if (blog.author != user.id) {
        return next(new ErrorHandler("You do not have permission to read this blog post", 400));
    }

    res.status(201).send({
        "success": "true",
        blog
    })
})

export const updateBlog = catchAsyncError(async (req, res, next) => {
    const blog_id = req.params.id;
    const user = req.user;

    if (!blog_id) {
        return next(new ErrorHandler("Please provide blog id in parameters", 400));
    }

    const blog = await Blog.findById(blog_id);

    if (!blog) {
        return next(new ErrorHandler("Incorrect blog id", 401));
    }

    if (blog.author != user.id) {
        return next(new ErrorHandler("You do not have permission to update this blog post", 400));
    }

    if (!req.body.title && !req.body.content) {
        return next(new ErrorHandler("Please provide fields to update", 400));
    }

    if (req.body.title != null) blog.title = req.body.title;
    if (req.body.content != null) blog.content = req.body.content;

    await blog.save();

    res.status(201).send({
        "success": "true",
        "message": "Blog updated successfully"
    })
})

export const deleteBlog = catchAsyncError(async (req, res, next) => {
    const blog_id = req.params.id;
    const user = req.user;

    if (!blog_id) {
        return next(new ErrorHandler("Incorrect blog id", 401));
    }

    const blog = Blog.findById(blog_id);
    if (blog.author != user.id) {
        return next(new ErrorHandler("You do not have permission to delete this blog post", 400));
    }

    await blog.remove();

    res.status(201).send({
        "success": "true",
        "message": "Blog deleted successfully"
    })
})