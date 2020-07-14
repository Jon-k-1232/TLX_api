const express = require("express");
const alertsRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth.js");
const jsonParser = express.json();
const alertsService = require("./alerts-service.js");

alertsRouter
  .route("/:group")
  .all(requireAuth)

  // Posts new alerts to property group of users
  .post(jsonParser, async (req, res) => {
    const db = req.app.get("db");
    const {
      current,
      expired,
      urgency,
      datePosted,
      dateExpire,
      to,
      toUserId,
      from,
      fromUserId,
      groupId,
      alertMessage,
    } = req.body;

    const newAlert = {
      current,
      expired,
      urgency,
      datePosted,
      dateExpire,
      to,
      toUserId,
      from,
      fromUserId,
      groupId,
      alertMessage,
    };

    // Checks if user is property manager or not. If they are then it proceeds with alert posting. If not then returns unauthorized.
    alertsService.landlordCheck(db, newAlert.fromUserId).then((manager) => {
      propertyManager = manager[0].role;

      // Checking that user is a landlord, will deny request if tenant
      if (propertyManager === "manager") {
        // Checking database for a Current alert, then deleting in order to make way for new current alert.
        alertsService.deleteCurrent(db, newAlert.groupId).then(() => {});

        // Inserts new alert into DB and return alert to front end with message and status.
        alertsService.insertAlert(db, newAlert).then(() => {
          alertsService
            .getCurrentAlert(db, newAlert.groupId)
            .then((currentAlert) => {
              res.send({
                currentAlert,
                message: "Group alert updated successfully.",
                status: 200,
              });
            });
        });
      } else {
        res.send({
          message: "Unauthorized",
          status: 401,
        });
      }
    });
  });

module.exports = alertsRouter;
