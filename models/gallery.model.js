import { Schema, model } from "mongoose";

const workSchema = new Schema({
    client: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    service: {
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ], 
    description: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    }
})


export default model('Gallery', workSchema)