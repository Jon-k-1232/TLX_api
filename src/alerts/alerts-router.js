const express = require("express");
const alertsRouter = express.Router();
//const { requireAuth } = require("../middleware/jwt-auth.js");
const jsonParser = express.json();
const alertsService = require("./alerts-service.js");


alertsRouter
    .route("/:group")
    //.all(requireAuth)
    .post(jsonParser, async (req, res) => {
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
        const db = req.app.get("db");

        alertsService
            //.insertAlert(db, newAlert)
            .then(() => {
                alertsService.getCurrentAlert(db, newAlert.groupId).then((currentAlert) => {
                    res.send({
                        currentAlert,
                        message: "Group update successfully.",
                        status: 200,
                    });
                });
            });


    });

module.exports = alertsRouter;