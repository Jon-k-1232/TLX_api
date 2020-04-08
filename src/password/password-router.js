const express = require("express");
const passwordRouter = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");

passwordRouter.route("/:user").post(jsonParser, async (req, res) => {
  let rawUserId = req.params.user;
  const db = req.app.get("db");

  let { password } = req.body;

  let updatedPassword = sanitizeFields({ password });
  db.insert()
    .from("contact_info")
    .where("userid", rawUserId)
    .update(updatedPassword)
    .then(function () {
      res.send({ message: 200 });
    });
});

module.exports = passwordRouter;
