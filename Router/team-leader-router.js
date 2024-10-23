const express = require("express")
const { getTeamMember, addTeamMember } = require("../controller/team-leaders-controller")
const router = express.Router()
const upload = require('../multerconfig/uploadConfig')

router.get("/", (req, res) => {
    res.send("Welcome hi").status(200)
})
router.route("/team/add-member").post( upload.single('profileIMG'), addTeamMember);
router.route("/team/:leaderId").get(getTeamMember);

module.exports = router