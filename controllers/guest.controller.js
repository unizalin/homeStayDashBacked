const { successHandler, errorHandler } = require('../server/handle');
const handleErrorAsync = require("../server/handleErrorAsync")
const Guest = require("../models/guest.model")
const appError = require("../server/appError")

// 創建新客人資料
exports.creatGuest = async(req,res,next) =>{
  try {
    const { name, sex, phoneNumber, remarks } = req.body
    const data = {name, sex, phoneNumber, remarks}
    if(!data.name || !data.sex){
      return next(appError(400,"欄位為正確填寫",next))
    }
    const newGuest = await Guest.create(data)
    successHandler(res,'success',newGuest)
  } catch (error) {
    errorHandler(res,'fasle',error)
  }
}
//查詢所有客人資料
exports.getGuests = async(req,res) => {
  try {
    const guests = await Guest.find();
    successHandler(res,'success',guests);
  } catch (error) {
    errorHandler(res,'fasle',error);
  }
}
//利用ID查詢個人資料
exports.findOne = async(req,res)=>{
  const userId = req.params.id;
  const userItem = await Guest.findById(userId).exec();
  successHandler(res,'success',userItem);
}
// 根據名稱或電話號碼查詢客人資料
exports.getGuestByNameOrPhone = async (req, res) => {
  try {
    const { query } = req.query;
    const guest = await Guest.findOne({ $or: [{ name: query }, { phone: query }] });
    if (!guest) {
      return res.status(404).json({ message: 'Guest not found' });
    }
    let guestObject = guest.toObject();
    delete guestObject._id;
    res.status(200).json(guestObject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching guest', error });
  }
};

