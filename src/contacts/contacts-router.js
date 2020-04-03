const express = require("express");
const contactsRouter = express.Router();
const jsonParser = express.json();
const {sanitizeFields} = require('../utils');

contactsRouter
    .route("/:user")
    .get(async (req, res) => {
        let rawUserId = req.params.user;
        const db = req.app.get("db");

        db.select()
            .from("contact_info")
            .whereIn("userid", [rawUserId])
            .then(userContactInfo =>
                res.send({
                    userContactInfo,
                    message: 200
                })
            );
    })

    .post(jsonParser, async (req, res) => {
        let rawUserId = req.params.user;
        const db = req.app.get('db');
        const { company, street, city, state, zip, email, phone, password, role, managerName, managerId, groupId } = req.body;

        const updatedContact = sanitizeFields({ company, street, city, state, zip, email, phone, password, role, managerName, managerId, groupId });

        db.insert()
            .from("contact_info")
            .where("userid", rawUserId)
            .update(updatedContact)
            .then(function() {
                res.send({ message: 200 });
            });
    });

// .post function here

module.exports = contactsRouter;
