require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const app = express();
const billsRouter = require("./bills/bills-router.js");
const messagesRouter = require("./messages/messages-router.js");
const contacts = require("./contacts/contacts.js");
const password = require("./password/password.js");
const registration = require("./registration/registration.js");

const morganOption = NODE_ENV === "development" ? "tiny" : "common";

//middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

/* ///////////////////////////\\\\  KEY VALIDATION  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

/*
app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN2;
    const authToken = req.get("Authorization");

    if (!authToken || authToken.split(" ")[1] !== apiToken) {
        return res.status(401).json({ error: "Unauthorized request" });
    }
    next();
});

 */

/* ///////////////////////////\\\\  ENDPOINTS  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

// Get all bill for a user
app.use("/bills", billsRouter);

// Get whole contact table, post all but password.
app.use("/contacts", contacts);

// Post updates password only rather than whole contact table
app.use("/amend", password);

// Get all messages for a user, Post messages with user data
app.use("/messages", messagesRouter);

// Post creates a contact string in contact_info db
app.use("/registration", registration);

/*
app.get('/', (req, res) => {
    res.send('Hello, world!')
    });

 */

app.use(errorHandler);

/* ///////////////////////////\\\\  ERROR HANDLER  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === "development") {
    response = { error: "server error" };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
}

module.exports = app;
