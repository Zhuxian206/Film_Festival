import express from 'express'
import content from '../middleware/content.js'
import auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'

import {
  create,
  getBookings,
  getAllBookings,
  getBookingById,
  updateBookingById,
  updateBookingByOrder
} from '../controllers/bookings.js'

const router = express.Router()

router.post('/', auth, admin, content('multipart/form-data'), upload, create)
router.get('/', getBookings)
router.get('/all', auth, admin, getAllBookings)
router.get('/:id', getBookingById)
router.patch('/:id', auth, admin, content('multipart/form-data'), upload, updateBookingById)
router.patch('/:id', auth, content('multipart/form-data'), updateBookingByOrder)
export default router
