import express from "express";
import { deleteUser, getMyProfile, getUserById, login, logout, register, updateUser } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/me").post(isAuthenticated, getMyProfile);
router.route("/users/:id").get(getUserById);
router.route("/users/:id").put(updateUser);
router.route("/users/:id").delete(deleteUser);

export default router;
