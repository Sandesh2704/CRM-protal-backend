const express = require("express")
const router = express.Router()
const upload = require('../multerconfig/uploadConfig')
const { addTeamLeader, getTeamLeaders, deleteTeamLeader } = require("../controller/manager-controller")


router.get("/", (req, res) => {
    res.send("Welcome hi").status(200)
})


router.route("/manager/add-team-leader").post(upload.single('profileIMG'), addTeamLeader);
router.route("/manager/:managerId").get(getTeamLeaders);
router.route("/manager/delete-team-leader/:leaderId").delete(deleteTeamLeader);
// router.route("/manager/assign-task").post(assignTask);

module.exports = router
