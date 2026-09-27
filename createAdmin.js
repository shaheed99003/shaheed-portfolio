import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
dotenv.config()
import User from './models/User.js'
await mongoose.connect(process.env.MONGO_URI)
const hashed = await bcrypt.hash('shaheed123', 10)
await User.deleteMany({email:'shaheed@gmail.com'})
await User.create({email:'shaheed@gmail.com', password:hashed})
console.log('DONE - Admin created')
process.exit()
