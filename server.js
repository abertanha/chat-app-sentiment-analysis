/* server.js */

const express = require("express");
const next = require("next");
const cors = require("cors");
const Pusher = require("pusher");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const Sentiment = require("sentiment");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();
const sentiment = new Sentiment();

// Ensure that your pusher credentials are properly set in the .env file
// Using the specified variables
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  useTLS: true,
});

if (!process.env.PUSHER_APP_ID || !process.env.PUSHER_APP_KEY) {
  throw new Error("Missing Pusher credentials in .env");
}else {
  console.log("> Pusher enviroment credentials found!");
}

app
  .prepare()
  .then(() => {
    const server = express();

    // Middleware
    server.use(cors());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));

    // Next.js request handling
    server.get("*", (req, res) => {
      return handler(req, res);
    });

    // error handling
    server.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).send("Something broke!");
    });

    const port = process.env.PORT || 3000;

    const chatHistory = { messages: [] };
    
    // /message and /messages rout config
    server.post("/message", (req, res, next) => {
      const { user = null, message = "", timestamp = +new Date() } = req.body;
      const sentimentScore = sentiment.analyze(message).score;
      const chat = { user, message, timestamp, sentiment: sentimentScore };

      chatHistory.messages.push(chat);
      pusher.trigger("chat-room", "new-message", { chat });
    });

    server.post("/messages", (req, res, next) => {
      res.json({ ...chatHistory, status: "success" });
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
