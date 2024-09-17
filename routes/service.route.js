import { Router } from "express";
import { addService, deleteSingleService, getAllServices, getSingleService, updateSingleService } from "../controllers/service.controller.js";
import { isBarber, verifyToken } from "../middlewares/auth.js";

const router = Router()
router.route('/').get(getAllServices)
router.route('/:serviceId').get(getSingleService).patch(verifyToken, isBarber, updateSingleService).delete(verifyToken, isBarber, deleteSingleService)
router.route('/add').post(verifyToken, isBarber, addService)

export default router