import express from "express";
import passport from "passport";

const router = express.Router()

router.route('/discord').get(passport.authenticate('discord'))
router.route('/discord/redirect').get(passport.authenticate('discord'), (req, res)=>{res.json({message: 'discord authenticated'})})

export default router