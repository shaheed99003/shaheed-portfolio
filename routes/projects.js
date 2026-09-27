import express from 'express'
import Project from '../models/Project.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req,res)=>{
  const projects = await Project.find().sort({createdAt:-1})
  res.json(projects)
})

router.post('/', auth, async (req,res)=>{
  const project = await Project.create(req.body)
  res.json(project)
})

router.delete('/:id', auth, async (req,res)=>{
  await Project.findByIdAndDelete(req.params.id)
  res.json({msg:'Deleted'})
})

export default router