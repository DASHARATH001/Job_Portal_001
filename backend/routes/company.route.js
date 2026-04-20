import express from "express"
import isAuth from "../middlewares/isAuth.js"
import singleUpload from '../middlewares/multer.js'
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/compay.controller.js";


const router = express.Router();
router.post("/register", isAuth, registerCompany);
router.get("/get", isAuth, getCompany);
router.get("/get/:id", isAuth, getCompanyById);
router.put("/update/:id", isAuth, singleUpload, updateCompany);

export default router;

// http://localhost:8080/api/company/register
