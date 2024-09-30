const { successHandler, errorHandler } = require('../server/handle');
const handleErrorAsync = require("../server/handleErrorAsync")
const Guest = require("../models/guest.model")
const appError = require("../server/appError")

// 處理 Line 的 /add 指令，並儲存客人資料到 MongoDB
const addCustomer = async (userMessage) => {
  // 解析訊息，例如 "/add 王大雄 0928902475"
  const parts = userMessage.split(' ');
  const name = parts[1];
  const phonenumber = parts[2];
  const data = {name, sex, phoneNumber, remarks}

  // 創建新的客人資料
  const newGuest = await Guest.create(data)
  try {
    await newCustomer.save();  // 儲存到資料庫
    return `客人 ${name} 已新增，電話號碼為 ${phonenumber}`;
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    return '無法新增客人，請稍後再試。';
  }
};

module.exports = {
  addCustomer
};
