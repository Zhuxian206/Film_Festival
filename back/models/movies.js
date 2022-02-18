import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, '片名為必填欄位']
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  director: {
    type: String,
    required: [true, '導演名稱為必填欄位']
  },
  directorDesc: {
    type: String
  },
  upState: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model('movies', movieSchema)
