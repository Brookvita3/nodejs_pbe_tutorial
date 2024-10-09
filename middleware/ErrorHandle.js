const { logEvents } = require("./LogEvents");

const ErrorHandler = (err, req, res, next) => {
  logEvents(
    `${err.name}\t${err.message}\t${req.method}\t${req.url}`,
    "errLog.txt"
  );
  console.log(err);
  res.status(500).send(err.message);
};

module.exports = ErrorHandler;
