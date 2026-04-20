import express from 'express'
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/application.controller.js';
import isAuth from '../middlewares/isAuth.js'

const router = express.Router();

router.get("/apply/:id", isAuth, applyJob);
router.get("/get", isAuth, getAppliedJobs);
router.get("/:id/applicants", isAuth, getApplicants);
router.post("/status/:id/update", isAuth, updateStatus);

export default router;

// http://localhost:8080/api/application/apply/697a0672b563b9c1a05d7c74
// http://localhost:8080/api/application/get
// http://localhost:8080/api/application/697a0672b563b9c1a05d7c74/applicants
// http://localhost:8080/api/application/status/697c6ab3ed067422acc1d69b/update