const express = require("express")
const router = express.Router()
const { assignTask } = require("../controller/task-controller")
router.get("/", (req, res) => {
    res.send("Welcome hi").status(200)
})
router.route("/assign-task").post(assignTask)

module.exports = router