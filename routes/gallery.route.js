import { Router } from "express";
import { addWorkToGallery, getGallery, getSingleWork, updateWork } from "../controllers/gallery.controller.js";
import { isBarber, verifyToken } from "../middlewares/auth.js";

const router = Router()
router.route('/').get(getGallery).post(verifyToken, isBarber, addWorkToGallery)
router.route('/:workId').get(getSingleWork).patch(verifyToken, isBarber, updateWork)


export default router