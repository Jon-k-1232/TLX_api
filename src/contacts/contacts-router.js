const express = require("express");
const contactsRouter = express.Router();
const authService = require("../auth/auth-service.js");
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");
const { requireAuth } = require("../middleware/jwt-auth.js");
const contactService = require("./contacts-service.js");

contactsRouter

  // Updates user password
  .route("/pass/:user")
  .all(requireAuth)
  .put(jsonParser, async (req, res) => {
    let userId = req.params.user;

    if (userId === "2") {
      res.send({
        status: 200,
        message:
          "Sorry, For demonstration purposes you are unable to update the user password" +
          " on this account. For non-demonstration accounts the user password will be updated.",
      });
    } else {
      const db = req.app.get("db");
      let { password } = req.body;

      // Jwt validation
      authService.hashPassword(password).then((hashedPassword) => {
        updatedPassword = { password: hashedPassword };

        contactService
          .updateUserPassword(db, userId, updatedPassword)

          .then(function () {
            res.send({
              status: 200,
              message: "Password changed successfully.",
            });
          });
      });
    }
  });

contactsRouter
  .route("/:user")

  // Gets all contact info along with manager table that matches user
  .all(requireAuth)
  .get(async (req, res) => {
    let userId = req.params.user;
    const db = req.app.get("db");

    // Gets contact info for user
    contactService
      .getContactInfo(db, userId)

      .then((userContactInfo) => {
        let managerId = userContactInfo[0].managerId;

        // Gets manager info for user
        contactService
          .getManagerInfo(db, managerId)

          .then((userManagerInfo) =>
            res.send({
              userContactInfo,
              userManagerInfo,
              status: 200,
            })
          );
      });
  })

  /*
  Updates all contact info (except for password) for a user id that is passed in the param.
  Returns updated user information along with status 200 so user is aware the update was complete, and
  user will see updated information.
   */
  .put(jsonParser, async (req, res) => {
    let userId = req.params.user;

    if (userId === "2") {
      res.send({
        status: 200,
        message:
          "Sorry, For demonstration purposes you are unable to update user information on" +
          " this account. For non-demonstration accounts user information will be updated.",
      });
    } else {
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

      contactService
        .updateContactInfo(db, userId, updatedContact)

        .then(function () {
          contactService.getContactInfo(db, userId).then((userContactInfo) =>
            res.send({
              userContactInfo,
              status: 200,
              message: "Contact information updated successfully.",
            })
          );
        });
    }
  });

module.exports = contactsRouter;
