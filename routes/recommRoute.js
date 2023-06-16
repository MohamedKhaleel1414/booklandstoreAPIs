const express = require("express");
const router = express.Router();
const recommService = require('../services/recommService')

router.post("/recommendation", recommendSystem.recommendations);

module.exports = router