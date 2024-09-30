const { successHandler, errorHandler } = require('../server/handle');
const handleErrorAsync = require("../server/handleErrorAsync")
const Guest = require("../models/guest.model")
const appError = require("../server/appError")

// 處理新增客人邏輯
const addCustomer = async (userMessage) => {
  const parts = userMessage.split(' ');
  console.log('userMessage',userMessage)
  console.log('parts',parts)
  const name = parts[1];
  const phoneNumber = parts[2];
  const data = {name, phoneNumber}

  if (!data.name || !data.phoneNumber) {
    return '格式不正確，請使用 /add 姓名 電話號碼';
  }
  console.log('data',data)
  const newGuest = await Guest.create(data)

  try {
    await newGuest.save();
    return `客人 ${name} 已成功新增，電話號碼為 ${phoneNumber}`;
  } catch (error) {
    console.error('Error saving customer:', error);
    return '新增失敗，請稍後再試。';
  }
};

module.exports = {
  addCustomer
};
