const express = require("express");
const contactsRouter = express.Router();
const authService = require("../auth/auth-service.js");
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");
const { requireAuth } = require("../middleware/jwt-auth.js");

contactsRouter

  // Updates user password
  .route("/change/:user")
  .all(requireAuth)
  .post(jsonParser, async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");

    let { password } = req.body;

    // Jwt validation
    authService.hashPassword(password).then((hashedPassword) => {
      updatedPassword = { password: hashedPassword };
      db.insert()
        .from("contact_info")
        .where("userid", rawUserId)
        .update(updatedPassword)
        .then(function () {
          res.send({ status: "Password changed successfully", message: 200 });
        });
    });
  });

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

  /*
  Posts an update to all contact info (except for password) for a user id that is passed in the param.
  Returns updated user information along with status 200 so user is aware the update was complete, and
  user will see updated information.
   */
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
        db.select()
          .from("contact_info")
          .whereIn("userid", [rawUserId])
          .then((userContactInfo) =>
            res.send({
              userContactInfo,
              message: 200,
            })
          );
      });
  });

module.exports = contactsRouter;
