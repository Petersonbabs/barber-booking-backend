import { Router } from "express";
import { deleteUser, getAllClients, getSingleClient, updateProfile } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = Router()

router.get('/', getAllClients)
router.route('/:id').get(getSingleClient).patch(verifyToken, updateProfile).delete(verifyToken, deleteUser)

export default router