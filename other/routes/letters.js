import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'

import {
  createLetters,
  getLetters,
  getAllLetters,
  getLetterById,
  updateLetterById
} from '../controllers/letters.js'

const router = express.Router()

router.post('/', auth, admin, content('multipart/form-data'), upload, createLetters)
router.get('/', getLetters)
router.get('/all', auth, admin, getAllLetters)
router.get('/:id', getLetterById)
router.patch('/:id', auth, admin, content('multipart/form-data'), upload, updateLetterById)

export default router
