require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const app = express();
const billsRouter = require("./bills/bills-router.js");
const messagesRouter = require("./messages/messages-router.js");
const contactsRouter = require("./contacts/contacts-router.js");
const passwordRouter = require("./password/password-router.js");
const registrationRouter = require("./registration/registration-router.js");
const authRouter = require("./auth/auth-router");

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

/* ///////////////////////////\\\\  USER ENDPOINTS  ////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*/

// Get all bill for a user
app.use("/bills", billsRouter);

// Get whole contact table, post all but password.
app.use("/contacts", contactsRouter);

// Post updates password only rather than whole contact table
app.use("/amend", passwordRouter);

// Get all messages for a user, Post messages with user data
app.use("/messages", messagesRouter);

// Post creates a contact string in contact_info db
app.use("/registration", registrationRouter);

// Post call for JWT Auth
app.use("/auth", authRouter);

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
