const express = require("express")
const { userinfo, deleteUsers, getUserCount, filterUsers } = require("../controller/user.controller")
const router = express.Router()

// POSt USER INFO TO DB FROM EXTERNAL API
router.route("/postdata").post(userinfo)
// DELETE ALL USERS
router.route("/delete").delete(deleteUsers)

// GET USER COUNT
router.route("/usercount").get(getUserCount) 

// FILTER USER DATA // Get all data 
router.route("/filter/:page").post(filterUsers)

module.exports = router