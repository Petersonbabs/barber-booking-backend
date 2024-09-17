import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    style: {
        type: String,
    },
    duration: {
        type: Number,  // Duration in minutes
        required: true,
    },

    featuredImg: {
        type: String
    }, 

    barberId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber', // Assuming you have a Barber model
    }
}, { timestamps: true });


export default mongoose.model('Service', serviceSchema);
