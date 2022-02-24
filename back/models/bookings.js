import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  date: {
    type: String,
    required: [true, '日期為必填欄位']
  },
  time: {
    type: String,
    enum: {
      values: ['上午場', '下午場'],
      message: '沒有該場次'
    }
  },
  price: {
    type: Number,
    min: [0, '價格格式不正確'],
    required: [true, '票券價格不能為空']
  },
  seat: {
    type: [Boolean],
    default: [
      false, false, false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false, false, false, false,
      false, false, false, false, false, false, false, false, false, false, false, false
    ]
  },
  seatNumber: {
    type: [
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12',
      'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12',
      'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12',
      'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12',
      'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12',
      'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
    ]
  },
  sell: {
    type: Boolean,
    default: false
  },
  movie: {
    type: mongoose.ObjectId,
    ref: 'movies',
    required: [true, '缺少影片ID']
  }
})

export default mongoose.model('bookings', bookingSchema)
