import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import usersRouter from './routes/users.js'
import moviesRouter from './routes/movies.js'
import newsRouter from './routes/news.js'

mongoose.connect(process.env.DB_URL, () => {
  console.log('MongoDB Connected')
})

const app = express()

app.use(cors({
  origin (origin, callback) {
    if (origin === undefined || origin.includes('github') || origin.includes('localhost')) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'), false)
    }
  }
}))
// cors 的錯誤
app.use((_, req, res, next) => {
  res.status(403).send({ success: false, message: '請求被拒絕' })
})
// express 在解析 json 時的錯誤
app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '資料格式錯誤' })
})

app.use('/users', usersRouter)
app.use('/movies', moviesRouter)
app.use('/news', newsRouter)

// 擋 404
app.all('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server Started')
})
