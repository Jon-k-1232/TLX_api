const express = require("express");
const billsRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth.js");

billsRouter
  .route("/:user")
  .all(requireAuth)
  .get(async (req, res) => {
    let rawUserId = req.params.user;
    const db = req.app.get("db");

    db.select()
      .from("bills")
      .whereIn("tenantId", [rawUserId])
      .then((userBills) =>
        res.send({
          userBills,
          message: 200,
        })
      );
  });

module.exports = billsRouter;
