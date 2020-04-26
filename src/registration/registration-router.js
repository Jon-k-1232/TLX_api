const express = require("express");
const registrationRouter = express.Router();
const jsonParser = express.json();
const authService = require("../auth/auth-service");
const registrationService = require("./registration-service.js");

registrationRouter
  .route("/new")

  // This sends back a list of mangers for new users to select if they select they are a tenant
  .get(jsonParser, async (req, res) => {
    const db = req.app.get("db");
    const manager = "manager";

    registrationService
      .getManagers(db, manager)

      .then((managerList) =>
        res.send({
          managerList,
          status: 200,
        })
      );
  })

  // Creates a new user
  .post(jsonParser, async (req, res) => {
    const db = req.app.get("db");
    let {
      company,
      street,
      city,
      state,
      zip,
      email,
      phone,
      password,
      role,
      managerName,
      managerId,
      groupId,
    } = req.body;

    authService.hashPassword(password).then((hashedPassword) => {
      newUser = {
        company,
        street,
        city,
        state,
        zip,
        email,
        phone,
        password: hashedPassword,
        role,
        managerName,
        managerId,
        groupId,
      };

      /*
      This function will run based on the value of the 'role' (manager or tenant) for a new user. If the role is set to
      manager the if block will run setting the managerName, managerId and create a new groupId. This will allow tenants
      to join this group and select this manager on the front end registration screen. IF the role of tenant is ran the
      managerName, managerId and groupId will already have a value because the user will be required to select a manger
      from a list on the front end.
      */
      if (role === "manager") {
        // Inserts the new user, mangerId, managerName, and groupId null at this point

        registrationService.insertNewUser(db, newUser).then(function () {
          // Finds the newly created row of data based on company name
          registrationService.getCompanyName(db, company).then((newInfo) => {
            // This part of the function updates the table values of managerName, managerId, and groupId
            let managerName = newInfo[0].company;
            let managerId = newInfo[0].userid;
            let groupId = newInfo[0].userid;

            updtdData = { managerName, managerId, groupId };

            // Inserts values into table
            registrationService
              .insertManagerIndicator(db, company)
              .then(function () {
                res.send({
                  status: 200,
                  message: "Property manager account added successfully",
                });
              });
          });
        });
      } else {
        // this triggers when the role is set to tenant. All data will be input in the row and attached to the manager
        registrationService.insertNewUser(db, newUser).then(function () {
          res.send({
            status: 200,
            message: "Tenant account added successfully",
          });
        });
      }
    });
  });

module.exports = registrationRouter;
