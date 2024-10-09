const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const { logger } = require("./middleware/LogEvents");
const errorHandler = require("./middleware/ErrorHandle");
const cors = require("cors");

const app = express();

// custom middleware
app.use(logger);

// Cross Origin Resource Sharing
const whitelist = [
  "http://localhost:3000",
  "http://127.0.0.1:5500",
  "https://www.google.com",
  "https://localhost:3000",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Request origin:", origin);
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.get("/aduvip(.jpg)?", (req, res) => {
  res.sendFile(path.join(__dirname, "resources", "images", "aduvip.jpg"));
});

app.all("/*", (req, res) => {
  res.status(404).send("404 Not found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
