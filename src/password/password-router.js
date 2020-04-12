const express = require("express");
const passwordRouter = express.Router();
const jsonParser = express.json();
const authService = require("../auth/auth-service.js");
const { requireAuth } = require("../middleware/jwt-auth.js");

passwordRouter
  .route("/:user")
  .all(requireAuth)
  .post(jsonParser, async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");

    let { password } = req.body;

    authService.hashPassword(password).then((hashedPassword) => {
      updatedPassword = { password: hashedPassword };
      db.insert()
        .from("contact_info")
        .where("userid", rawUserId)
        .update(updatedPassword)
        .then(function () {
          res.send({ message: 200 });
        });
    });
  });

module.exports = passwordRouter;
