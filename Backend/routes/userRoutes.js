import { loginUser, logoutUser, userRegister } from "../controllers/userController.js";
import express from "express"
const router = express.Router();

router.route("/register").post(userRegister)
router.route("/login").post(loginUser)
router.route("/logout").post(logoutUser)

export default router