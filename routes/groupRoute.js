const express = require("express");
const router = express.Router();
const groupService = require('../services/groupService')

router.get('/getgroups',groupService.getAllGroups)
router.post('/addgroup',groupService.addGroup)
router.patch('/addusertogroup',groupService.addUserstoGroup)
router.delete('/deletegroup',groupService.deleteGroup)

module.exports = router