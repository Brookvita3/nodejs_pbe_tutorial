const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/aduvip(.jpg)?", (req, res) => {
    res.sendFile(path.join(__dirname,"..", "resources", "images", "aduvip.jpg"));
});

module.exports = router