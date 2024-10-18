import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import dotenv from 'dotenv'
dotenv.config()

const GoogleStrategy = Strategy
export default passport.use( new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/api/v1/google/redirect',
    passReqToCallback: true,
    scope: ['email']
    },

    function(req, accessToken, refreshToken, profile, done){
        console.log('profile: ' +profile);
        // return done(null, profile)
    }

))

// passport.serializeUser((user, done)=>{
//     console.log(user);
//     return done(null, user)
// })

// passport.deserializeUser((user, done)=>{
//     return done(null, user)
// })