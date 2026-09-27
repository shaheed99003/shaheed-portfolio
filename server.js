import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import projectRoutes from './routes/projects.js'
import messageRoutes from './routes/messages.js'

dotenv.config()
const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'https://*.vercel.app', process.env.FRONTEND_URL].filter(Boolean),
  credentials: true
}))
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static('uploads'))

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log('MongoDB Connected'))
  .catch(err=>console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/messages', messageRoutes)

app.get('/', (req,res)=> res.send('Backend Live - Portfolio API'))

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> console.log(`Server on ${PORT}`))