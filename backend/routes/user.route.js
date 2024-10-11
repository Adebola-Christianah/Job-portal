import express from "express";
import { login, logout, register,updateProfilePicture, updateProfile, forgotPassword, resetPassword } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
router.route("/profile-picture/update").post(isAuthenticated, singleUpload, updateProfilePicture);
router.post('/forgot-password', forgotPassword);
router.post('/password-reset/:token', resetPassword);

export default router;
