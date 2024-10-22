const express = require("express")
const { getTeamMember, addTeamMember } = require("../controller/team-controller")
const router = express.Router()

router.get("/", (req, res) => {
    res.send("Welcome hi").status(200)
})
router.route("/team/add-member").post(addTeamMember);
router.route("/team/:leaderId").get(getTeamMember);

module.exports = router