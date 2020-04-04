const express = require("express");
const contacts = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");

contacts
  .route("/data/:user")

  // Gets all contact info for a user id that is passed in the param
  .get(async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");

    db.select()
      .from("contact_info")
      .whereIn("userid", [rawUserId])
      .then((userContactInfo) =>
        res.send({
          userContactInfo,
          message: 200,
        })
      );
  })

  // Posts an update to all contact info (except for password) for a user id that is passed in the param
  .post(jsonParser, async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");
    const {
      company,
      street,
      city,
      state,
      zip,
      email,
      phone,
      role,
      managerName,
      managerId,
      groupId,
    } = req.body;

    const updatedContact = sanitizeFields({
      company,
      street,
      city,
      state,
      zip,
      email,
      phone,
      role,
      managerName,
      managerId,
      groupId,
    });

    db.insert()
      .from("contact_info")
      .where("userid", rawUserId)
      .update(updatedContact)
      .then(function () {
        res.send({ message: 200 });
      });
  });

module.exports = contacts;
