const express = require("express");
const messagesRouter = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");
const { requireAuth } = require("../middleware/jwt-auth.js");
const messageService = require("./messages-service.js");

messagesRouter
  .route("/:user")
  // Gets Inbox messages, get sent messages, and get all messages
  .all(requireAuth)
  .get(async (req, res) => {
    let userId = req.params.user;
    const db = req.app.get("db");

    messageService.getInboxUserMessage(db, userId).then((inboxMessages) => {
      messageService.getFromUserMessage(db, userId).then((sentMessages) => {
        let allMessages = inboxMessages.concat(sentMessages);

        res.send({
          inboxMessages,
          sentMessages,
          allMessages,
          status: 200,
        });
      });
    });
  })

  // Posts a new message
  .post(jsonParser, async (req, res) => {
    const db = req.app.get("db");
    const {
      date,
      to,
      toUserId,
      from,
      fromUserId,
      subject,
      subjectId,
      messageContent,
      groupId,
    } = req.body;

    const newMessage = sanitizeFields({
      date,
      to,
      toUserId,
      from,
      fromUserId,
      subject,
      subjectId,
      messageContent,
      groupId,
    });

    messageService
      .insertMessage(db, newMessage)

      .then(function () {
        res.send({ message: "Message sent successfully.", status: 200 });
      });
  });

module.exports = messagesRouter;
