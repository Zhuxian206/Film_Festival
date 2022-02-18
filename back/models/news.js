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
  upState: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: {
      values: ['新聞', '公告', '推廣'],
      message: '商品分類不存在'
    }
  }
  // commentsBlock: {
  //   type: [
  //     {
  //       comments: {
  //         type: mongoose.ObjectId,
  //         ref: 'user.comment',
  //         required: [true, '缺少留言 ID']
  //       },
  //       commentsState: {
  //         type: String,
  //         required: [true, '缺少內文']
  //       }
  //     }
  //   ]
  // }
})

export default mongoose.model('news', newSchema)
