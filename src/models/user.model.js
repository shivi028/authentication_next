import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Provide a username'],
        unique: [true, 'Username should be unique']
    },
    email: {
        type: String,
        required: [true, 'Provide a email'],
        unique: [true, 'Email should be unique']
    },
    password: {
        type: String,
        required: [true, 'Provide a password'],
        unique: [true]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

    
})

// edge case (is already model is there just provide reference, if not make model)
const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User
