import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import Session from 'express-session'
import './strategies/discord.js'
const app = express();

app.use(Session({secret: 'cats'}))
app.use(passport.initialize())
app.use(passport.session())

// ROUTERS
import authRoutes from './routes/auth.route.js' 
import errorHandler from './middlewares/errorHandler.js';
import appointmentRoutes from './routes/appointment.route.js'
import usersRoutes from './routes/users.route.js'
import serviceRoutes from './routes/service.route.js'
import reviewRoutes from './routes/review.route.js'
import galleryRoutes from './routes/gallery.route.js'
import authStrategiesRoutes from './routes/authStrategies.js'
import './controllers/google.js'
import passport from 'passport';


// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


// ENDPOINTS
app.use('/api/v1/auth/third', authStrategiesRoutes)
app.use('/api/v1/auth', authRoutes)

app.get('/api/v1/auth/google', passport.authenticate('google'))
app.get('/api/v1/google/redirect', passport.authenticate('google'), (req, res)=>{res.send('google authenticated')})
app.use('/api/v1/appointments', appointmentRoutes)
app.use('/api/v1/users', usersRoutes)
app.use('/api/v1/services', serviceRoutes)
app.use('/api/v1/reviews', reviewRoutes)
app.use('/api/v1/gallery', galleryRoutes)
app.get('/api/v1', (req, res) => {
  res.send('Barber Appointment V1');
});

const isLoggedIn = (req, res, next)=>{
  req.user ? next() : res.statusCode(401)
}
app.get('/api/v1/googlecallback', passport.authenticate('google', {
  successRedirect: '/protected',
  failureRedirect: '/failure'
}))

app.get('/protected', isLoggedIn, (rr, res)=>{
  res.send('hello')
})


app.get('/failure', (req, res)=>{res.send('something went wrong')})


app.all('*', (req, res) => {
  res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})


app.use("*", errorHandler)

export default app