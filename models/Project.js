import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: String,
  desc: String,
  tags: [String],
  image: String,
  github: String,
  live: String
}, { timestamps: true })

const Project = mongoose.model('Project', projectSchema)
export default Project