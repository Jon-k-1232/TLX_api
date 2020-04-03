const express = require("express");
const messagesRouter = express.Router();
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');

messagesRouter
    .route("/:user")
    .get(async (req, res) => {
        let rawUserId = req.params.user;
        const db = req.app.get("db");

        db.select()
            .from("messages")
            .whereIn("toUserId", [rawUserId])
            .orWhereIn("fromUserId", [rawUserId])
            .then(userMessages =>
                res.send({
                    userMessages,
                    message: 200
                })
            );
    })

    .post(jsonParser, async (req, res) => {
        const db = req.app.get('db');
        const { company, street, city, state, zip, email, phone, password, role, mangerName, managerId, groupId } = req.body;

        const updateContact = sanitizeFields({ company, street, city, state, zip, email, phone, password, role, mangerName, managerId, groupId });

        db.insert(updateContact)
            .returning("*")
            .into("messages")
            .then(function() {
                res.send({ message: 200 });
            });
    });

module.exports = messagesRouter;