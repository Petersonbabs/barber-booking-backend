import { Router } from "express";
import { addReview, getAllReviews } from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/auth.js";
const router = Router()
router.route('/').get(getAllReviews).post(verifyToken, addReview)

export default router