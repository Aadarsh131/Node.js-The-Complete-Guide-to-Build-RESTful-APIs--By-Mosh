const express = require('express');
const router = express.Router()


router.get("/", (req, res) => {
    res.send("Aadarsh!!! World");
  });

module.exports = router