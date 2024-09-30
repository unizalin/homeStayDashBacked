const { successHandler, errorHandler } = require('../server/handle');
const handleErrorAsync = require("../server/handleErrorAsync")
const Guest = require("../models/guest.model")
const appError = require("../server/appError")

// 處理新增客人邏輯
const addCustomer = async (userMessage) => {
  const parts = userMessage.split(' ');
  const name = parts[1];
  const phonenumber = parts[2];

  if (!name || !phonenumber) {
    return '格式不正確，請使用 /add 姓名 電話號碼';
  }

  const newGuest = await Guest.create({ name, phonenumber })

  try {
    await newGuest.save();
    return `客人 ${name} 已成功新增，電話號碼為 ${phonenumber}`;
  } catch (error) {
    console.error('Error saving customer:', error);
    return '新增失敗，請稍後再試。';
  }
};

module.exports = {
  addCustomer
};
