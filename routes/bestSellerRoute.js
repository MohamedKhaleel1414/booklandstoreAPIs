const express = require("express");
const router = express.Router();
const bestSellerService = require('../services/bestSellerService')

router.get('/bestbooks',bestSellerService.bestSellerBooks)
router.get('/bestcourses',bestSellerService.bestSellerCourses)

module.exports = router