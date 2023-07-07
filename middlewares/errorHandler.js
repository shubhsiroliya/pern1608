const ErrorHandler = require("../utils/errorResponse");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  // Handle non-serializable value error
  if (err.name === "Error" && err.code === "ERR_BAD_RESPONSE") {
    const message = "Bad response received";
    err = new ErrorHandler(message, 500);
  }

  // Handle wrong DB ID error
  if (err.name === "QueryResultError" && err.code === "22003") {
    const message = "Resource not found";
    err = new ErrorHandler(message, 404);
  }

  // Handle duplicate key error
  if (err.code === "23505") {
    const message = "Duplicate field value entered";
    err = new ErrorHandler(message, 400);
  }

  // Handle missing database error
  if (err.name === "error" && err.code === "3D000") {
    const message = "Database does not exist";
    err = new ErrorHandler(message, 500);
  }

  // Handle table not created error
  if (err.name === "error" && err.code === "42P01") {
    const message = "Table does not exist";
    err = new ErrorHandler(message, 500);
  }

  // Handle column does not exist error
  if (err.name === "error" && err.code === "42703") {
    const message = "Column does not exist";
    err = new ErrorHandler(message, 500);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
