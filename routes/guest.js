var express = require('express');
var router = express.Router();
const guestController = require("../controllers/guest.controller")
const handleErrorAsync = require("../server/handleErrorAsync")

// 創建新客人資料 
router.post('/creatGuest', handleErrorAsync(guestController.creatGuest))
// 查詢所有客人資料 
router.get('/getGuests', handleErrorAsync(guestController.getGuests))
// 查詢個人資料 
router.post('/getGuest/:id', handleErrorAsync(guestController.findOne))
// 查詢個人資料 
router.post('/Guest/:id', handleErrorAsync(guestController.findOne))


module.exports = router;
