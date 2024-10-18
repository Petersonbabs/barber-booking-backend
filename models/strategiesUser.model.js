import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    name: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    phoneNumber: {type: String, unique: false, required: false},
    location: {
        type: String
    },
    password: { type: String, required: true, select: false },
    profilePic: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/001/840/618/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
    },
    
    role: { type: String, default: 'client' }
})

export default mongoose.model('')