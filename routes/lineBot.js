// routes/lineBot.js
var express = require("express");
var router = express.Router();
var line = require("@line/bot-sdk");

// LINE bot configuration
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);

// Middleware to validate requests from LINE platform
router.use(line.middleware(config));

// Handle webhook events
router.post("/", (req, res) => {
  const events = req.body.events;

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
