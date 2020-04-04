const express = require("express");
const registration = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");

registration.route("/new").post(jsonParser, async (req, res) => {
  let rawUserId = req.params.user;
  const db = req.app.get("db");
  const { password } = req.body;

  const updatedPassword = sanitizeFields({ password });

  db.insert()
    .from("contact_info")
    .where("userid", rawUserId)
    .update(updatedPassword)
    .then(function () {
      res.send({ message: 200 });
    });
});

module.exports = registration;
