const express = require("express");
const router = express.Router();
const recommService = require('../services/recommService')

router.post("/recommendation", recommService.recommendations);

module.exports = router