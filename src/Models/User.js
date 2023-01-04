import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    }
}, { collection : 'users'})

UserSchema.pre("save", async function(next)  {
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

export const User = mongoose.model("users", UserSchema)
