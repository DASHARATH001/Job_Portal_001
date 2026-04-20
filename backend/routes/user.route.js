import express from "express"
import { register, login, logout, updateProfile } from "../controllers/user.controller.js"
import isAuth from "../middlewares/isAuth.js"
import singleUpload from '../middlewares/multer.js'

const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
router.put("/profile/update", isAuth, singleUpload, updateProfile);
router.get("/logout", logout);

export default router;

// http://localhost:8080/api/user/register