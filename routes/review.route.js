import { Router } from "express";
import { addReview, deleteReview, getAllReviews } from "../controllers/review.controller.js";
import { isBarber, verifyToken } from "../middlewares/auth.js";
const router = Router()
router.route('/').get(getAllReviews).post(verifyToken, addReview)
router.route('/:reviewId').delete(verifyToken, isBarber, deleteReview)

export default router