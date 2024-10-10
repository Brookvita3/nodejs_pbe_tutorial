const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3000;
const { logger } = require("./middleware/LogEvents");
const errorHandler = require("./middleware/ErrorHandle");
const cors = require("cors");
const corsOptions = require("./config/corsOption");

const app = express();

// custom middleware
app.use(logger);

// enable cors
app.use(cors(corsOptions));  

// midleware for url encoded
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

// serves static files
app.use(express.static(path.join(__dirname, "public")));

// router
app.use("/", require("./router/root"));
app.use("/subdir", require("./router/subdir"));
app.use("/employees", require("./router/api/employees"));


// if not match return not found
app.all("*", (req, res) => {
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "resources", "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "Not found" });
  } else {
    res.status(404).send("404 Not found");
  }
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
