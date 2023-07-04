const express = require("express");
const router = express.Router();
const bestSellerService = require('../services/bestSellerService')

router.get('/bestproducts',bestSellerService.bestSeller)

module.exports = router