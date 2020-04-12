const express = require("express");
const contactsRouter = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");
const { requireAuth } = require("../middleware/jwt-auth.js");

contactsRouter
  .route("/data/:user")

  // Gets all contact info along with manager table that matches user
  .all(requireAuth)
  .get(async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");

    db.select()
      .from("contact_info")
      .whereIn("userid", [rawUserId])
      .then((userContactInfo) => {
        let managerId = userContactInfo[0].managerId;

        db.select()
          .from("contact_info")
          .whereIn("userid", [managerId])
          .then((userManagerInfo) =>
            res.send({
              userContactInfo,
              userManagerInfo,
              message: 200,
            })
          );
      });
  })

  // Posts an update to all contact info (except for password) for a user id that is passed in the param
  .post(jsonParser, async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");
    const { company, street, city, state, zip, email, phone } = req.body;

    const updatedContact = sanitizeFields({
      company,
      street,
      city,
      state,
      zip,
      email,
      phone,
    });

    db.insert()
      .from("contact_info")
      .where("userid", rawUserId)
      .update(updatedContact)
      .then(function () {
        res.send({ message: 200 });
      });
  });

module.exports = contactsRouter;
