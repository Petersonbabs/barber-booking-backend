import { Router } from "express";
import { isBarber, verifyToken } from "../middlewares/auth.js";
import { bookAppointment, deleteAppointment, getClientAppointments, getBarberAppointments, updateAppointment } from "../controllers/appointment.controller.js";

const router = Router()

// Book an appointment
router.route('/book').post(verifyToken, bookAppointment)

// Get All Appointments for a client
router.route('/my-appointments').get(verifyToken, getClientAppointments) 

// Get All Appointments for a Barber
router.route('/').get(verifyToken, isBarber, getBarberAppointments) 


// Upadate appointment: reschedule, change service, cancel,  etc
router.route('/:id').patch(verifyToken, updateAppointment)

// confirm appointment, delete
router.route('/admin/:id').patch(verifyToken, isBarber, updateAppointment).delete(verifyToken, isBarber, deleteAppointment)

// delete/cancel appointment

export default router