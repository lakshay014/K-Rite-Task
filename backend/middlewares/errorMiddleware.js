// @desc                This middleware is to overwrite the default response behaviour of express error handler
// @deafult behaviour   [ throw new Error("Error Description")] output HTML
// @expected behaviour  [ throw new Error("Error Description")] output JSON

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500; // 500 : Server Error
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // For more info about error
  });
};

module.exports = {
  errorHandler,
};
