import passport from "passport";
import {Strategy} from "passport-discord"
import dotenv from "dotenv"
dotenv.config()

export default passport.use(
    new Strategy({
        clientID: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
        callbackURL: 'http://localhost:4000/api/v1/auth/third/discord/redirect',
        scope: ['email', 'identify']
    },
        (accessToken, refreshToken, profile, done) =>{
            console.log(profile);
        }
    ) 
)