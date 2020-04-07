const express = require("express");
const registrationRouter = express.Router();
const jsonParser = express.json();
const { sanitizeFields } = require("../utils");

registrationRouter
  .route("/new")

  // This sends back a list of mangers for new users to select if they select they are a tenant
  .get(jsonParser, async (req, res) => {
    const db = req.app.get("db");
    const manager = "manager";

    db.select()
      .from("contact_info")
      .whereIn("role", [manager])
      .then((managerList) =>
        res.send({
          managerList,
          message: 200,
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

    newUser = sanitizeFields({
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
    });

    /*
    This function will run based on the value of the 'role' (manager or tenant) for a new user. If the role is set to
    manager the if block will run setting the managerName, managerId and create a new groupId. This will allow tenants
    to join this group and select this manager on the front end registration screen. IF the role of tenant is ran the
    managerName, managerId and groupId will already have a value because the user will be required to select a manger
    from a list on the front end.
     */
    if (role === 'manager') {
        // Inserts the new user, mangerId, managerName, and groupId null at this point
      db.insert(newUser)
        .returning("*")
        .into("contact_info")
        .then(function () {

            // Finds the newly created row of data based on company name
          db.select()
            .from("contact_info")
            .whereIn("company", [company])
            .then((newInfo) => {

                // This part of the function updates the table values of managerName, managerId, and groupId
              let managerName = newInfo[0].company;
              let managerId = newInfo[0].userid;
              let groupId = newInfo[0].userid;

              updtdData = { managerName, managerId, groupId };

              // Inserts values into table
              db.insert()
                .from("contact_info")
                .where("company", company)
                .update(updtdData)
                .then(function () {
                  res.send({ message: 200});
                });
            });
        });
    } else {

      // this triggers when the role is set to tenant. All data will be input in the row and attached to the manager
      db.insert(newUser)
        .returning("*")
        .into("contact_info")
        .then(function () {
          res.send({ message: 200 });
        });
    }
  });

module.exports = registrationRouter;
