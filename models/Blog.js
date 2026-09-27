import mongoose from 'mongoose'
const schema = new mongoose.Schema({
  title: String, slug: { type: String, unique: true },
  content: String, cover: String, tags: [String], published: Boolean
},{ timestamps: true })
export default mongoose.model('Blog', schema)