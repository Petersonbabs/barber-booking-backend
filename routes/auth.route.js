import { Router } from "express";
import {login, register, signInWithGoogle,  } from "../controllers/auth.controller.js";

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', signInWithGoogle)
// router.post('/token', (req, res)=>{
//     if(!req.body.token){
//         res.status(403).json({
//             status: 'error',
//             message: "You're not logged in!"
//         })
//     }
// })



export default router