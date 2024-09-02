// routes/lineBot.js
var express = require("express");
var router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
var line = require("@line/bot-sdk");

// LINE bot configuration
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};
console.log('Line bot config',config)
const client = new line.Client(config);

// LINE webhook route
router.post("/", line.middleware(config), (req, res) => {
  const events = req.body.events
  console.log('linebot events',events);
  events.forEach(async (event) => {
    if (event.type === "message" && event.message.type === "text") {
      try {
        await client.replyMessage(event.replyToken, {
          type: "text",
          text: event.message.text,
        });
        res.status(200).send("OK");
      } catch (err) {
        console.error("Error:", err);
        res.status(500).end();
      }
    }
  });
});

module.exports = router;

