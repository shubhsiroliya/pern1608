const express = require("express");
const app = express();
const dotenv = require("dotenv");
const path = require('path');
const errorHandler = require("./middlewares/errorHandler");

// Route Imports
const xlRoutes = require("./routes/xlRoutes");

//config
dotenv.config();

app.use(express.json());

// Middleware for Errors
app.use(errorHandler);

app.use("/api/v1", xlRoutes);

module.exports = app;
