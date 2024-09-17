import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // name, phoneNumber and email of the client
    barber: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    service: { type: String, required: true },
    date: { type: Date, required: true },
    status: { type: String, default: 'pending' }, // 'pending', 'confirmed', 'cancelled'
    createdAt: { type: Date, default: Date.now },
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);

export default Appointment;
