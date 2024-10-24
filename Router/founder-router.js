const express = require("express")
const router = express.Router()
const upload = require('../multerconfig/uploadConfig')
const { addManager, getManagers, deleteManager } = require("../controller/founder-controller")

router.get("/", (req, res) => {
    res.send("Welcome hi").status(200)
})

router.route("/founder/add-manager").post(upload.single('profileIMG'), addManager);
router.route("/founder/:founderId").get(getManagers);
router.route("/founder/delete-manager/:managerId").delete(deleteManager);

module.exports = router