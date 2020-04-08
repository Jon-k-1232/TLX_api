const express = require("express");
const messagesRouter = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");

messagesRouter
  .route("/:user")

  // Gets Inbox messages, get sent messages, and get all messages
  .get(async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");

    db.select()
      .from("messages")
      .whereIn("toUserId", [rawUserId])
      .then((inboxMessages) => {
        db.select()
          .from("messages")
          .whereIn("fromUserId", [rawUserId])
          .then((sentMessages) => {
            let allMessages = inboxMessages.concat(sentMessages);

            res.send({
              inboxMessages,
              sentMessages,
              allMessages,
              message: 200,
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

    db.insert(newMessage)
      .returning("*")
      .into("messages")
      .then(function () {
        res.send({ message: 200 });
      });
  });

module.exports = messagesRouter;
