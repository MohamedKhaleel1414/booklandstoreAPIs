const express = require("express");
const router = express.Router();
const groupService = require('../services/groupService')

router.post('/addgroup',groupService.addGroup)
router.patch('/addusertogroup',groupService.addUserstoGroup)

module.exports = router