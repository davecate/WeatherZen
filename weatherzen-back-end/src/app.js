const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const observationsRouter = require("./observations/observations.router")

const app = express();

// cors for http security
app.use(cors())
// express.json converts data to json format
app.use(express.json());

// attaches the express router
app.use("/observations", observationsRouter)

// attaches error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;
