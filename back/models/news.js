import mongoose from 'mongoose'

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '標題為必填欄位']
  },
  description: {
    type: String,
    required: [true, '內文為必填欄位']
  },
  image: {
    type: String
  },
  post: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('news', newSchema)
