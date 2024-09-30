const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, '請輸入您的名字']
    },
    phoneNumber: {
      type: String,
      required: [true, '請輸入電話號碼']
    },
    sex:{
      type: String,
      enum:["male","female"],
      default: male,
    },
    remarks:{
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  });
// Guest
const Guest = mongoose.model('Guest', guestSchema);

module.exports = Guest;