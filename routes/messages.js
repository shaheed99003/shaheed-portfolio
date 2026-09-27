import express from 'express'
import Message from '../models/Message.js'

const router = express.Router()

router.post('/', async (req,res)=>{
  const msg = await Message.create(req.body)
  res.json(msg)
})

router.get('/', async (req,res)=>{
  const msgs = await Message.find().sort({createdAt:-1})
  res.json(msgs)
})

export default router