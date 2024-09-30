// routes/lineBot.js
var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var line = require("@line/bot-sdk");
const linebotController = require('../controllers/linebot.controller');  // 引入控制器

// LINE bot configuration
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
console.log('Line bot config',config)
const client = new line.Client(config);

// LINE webhook route
router.post("/", line.middleware(config), async (req, res) => {
  const events = req.body.events;
  console.log('linebot events', events);

  // 使用 Promise.all 確保每個事件都正確處理
  await Promise.all(events.map(handleEvent));
});

async function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // 非文字訊息，不處理
    return Promise.resolve(null);
  }

  const userMessage = event.message.text.toLowerCase(); // 將使用者訊息轉成小寫，方便比對

  // 根據不同的關鍵字呼叫不同的 API
  switch (true) {
    case /新增客人|\/addc/i.test(userMessage):
      const replyMessage = await linebotController.addCustomer(userMessage);
      await client.replyMessage(event.replyToken, {
        type: 'text',
        text: replyMessage
      });
      break;  // 確保離開 switch
  
    case /新聞/.test(userMessage):
      return callNewsAPI(event.replyToken);  // 呼叫新聞 API
      break;
  
    case /股票/.test(userMessage):
      return callStockAPI(event.replyToken);  // 呼叫股票 API
      break;
  
    default:
      return replyDefaultMessage(event.replyToken);  // 回傳預設訊息
  }
  
}

module.exports = router;

