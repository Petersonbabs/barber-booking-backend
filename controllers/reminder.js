import Appointments from "../models/appointment.model"

// ADD APPOINTMENT TO CALENDAR
import encodeURIComponent from 'encodeURIComponent';

const addAppointmentToCalendar = async (req, res, next) => {
    try {
        const appointment = await Appointments.findById(req.params.id).populate('client service');

        if (!appointment) {
            return res.status(404).json({
                status: 'error',
                message: 'This appointment does not exist',
            });
        }

        // Extract relevant appointment data
        const { client, service, date } = appointment;

        // Create a Google Calendar event URL (as an example)
        const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(service.name)}&dates=${encodeURIComponent(new Date(date).toISOString())}&details=${encodeURIComponent('Appointment with ' + client.name)}&location=Your Barbershop Location`;

        // You can store the calendar URL in the request for the next middleware/route
        req.appointment = appointment;
        req.calendarUrl = calendarUrl;

        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong while processing the appointment',
        });
    }
};

export default addAppointmentToCalendar;
