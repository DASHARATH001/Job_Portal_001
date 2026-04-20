import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { getAdminJobs, getAlljobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.post('/post', isAuth, postJob);
router.get('/get', isAuth, getAlljobs);
router.get('/get/:id', isAuth, getJobById);
router.get('/getadminjobs', isAuth, getAdminJobs);

export default router;

// http://localhost:8080/api/job/post
