const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


// userSechma 
const userSechma = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: String, required: true },
    JobPosition: { type: String, required: true },
    jobRole: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false},
    gender: { type: String, required: false},
    profileIMG: { type: String, required: false},
})


userSechma.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);  // Pass the error to the next middleware
    }
});


// Password comper logic
userSechma.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// token genertion logic
userSechma.methods.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
            process.env.JWT_KEY,
            {
                expiresIn: '30d'
            }
        )
    } catch (error) {
        console.error(error)
    }
}

const User = new mongoose.model("User", userSechma)
module.exports = User 