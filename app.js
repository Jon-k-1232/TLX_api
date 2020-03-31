require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();

const morganOption = NODE_ENV === "development" ? "tiny" : "common";

//middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(express.json());

app.use(
    cors({
        origin: "*"
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

app.get('/', (req, res) => {
    res.send('Hello, world!')
    });

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