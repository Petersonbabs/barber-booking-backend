import Appointment from "../models/appointment.model.js";



// Book an Appointment
export const bookAppointment = async (req, res) => {
    const { service, date } = req.body;
    try {
        if (!service || !date) {
            res.status(400).json({
                message: 'Kindly fill all details'
            })
        }
        const appointment = await Appointment.create({ ...req.body, client: req.user.id })
        if (!appointment) {
            res.status(400).json({
                status: 'error',
                message: 'Appointment was not created'
            })
        }

        res.status(201).json({ status: 'error', message: 'Appointment booked!', appointment });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
        console.log(err)
    }
}


// Get All Appointments for a Client
export const getClientAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ client: req.user.id }).populate('barber', 'name');
        res.status(200).json({
            status: 'error',
            message: 'All appointments fetched successfully!',
            numOfAppointments: appointments.length,
            appointments
        })
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Get All Appointments for the Barber
export const getBarberAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().populate('client', 'name');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}

// Update Appointment Status (Confirm or Cancel)
export const updateAppointment = async (req, res) => {
  
    try {
        let appointmentExists = await Appointment.findById(req.params.id);
        if (!appointmentExists) {
            return res.status(404).json({status: 'error', message: 'Appointment not found' });
        }
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            status: 'success',
            message: 'Appointment updated successfully!',
            appointment
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error' });
    }
}


// Cancel/Delete an Appointment
export const deleteAppointment = async (req, res) => {
    try {
        let appointment = await Appointment.findById(req.params.id);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        await appointment.remove();
        res.json({ message: 'Appointment deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}


