import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: {
        type: String,
        unique: [true, 'A customer with this number already exist.'],
        required: [true, 'Your number is required for us to reacvh you.']
    },
    location: {
        type: String
    },
    password: { type: String, required: true, select: false },
    profilePic: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/previews/001/840/618/non_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
    },
    role: { type: String, default: 'client' }, // 'user' or 'barber'
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default mongoose.model('User', UserSchema);
