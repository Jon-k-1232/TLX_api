const express = require("express");
const billsRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth.js");
const billsService = require("./bills-service.js");

billsRouter
  .route("/:user")
  .all(requireAuth)
  .get(async (req, res) => {
    let userId = req.params.user;
    const db = req.app.get("db");

    billsService
      .getBillsByUserId(db, userId)

      .then((userBills) =>
        res.send({
          userBills,
          message: 200,
        })
      );
  });

module.exports = billsRouter;
