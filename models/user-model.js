const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema;

// userSechma 
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    department: { type: String, required: false },
    jobPosition: { type: String, required: true }, 
    jobRole: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    gender: { type: String, required: false },
    profileIMG: { type: String, required: false },
    joiningDate: {type: String, require: false },
    founderId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    managerId: { type: Schema.Types.ObjectId, ref: 'User' }, 
    teamLeaderId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' }, 
}, { timestamps: true });


const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teamLeader: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Team Leader reference
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }] // Team Members reference
});


userSchema.pre("save", async function (next) {
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
userSchema.methods.ComparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// token genertion logic
userSchema.methods.generateToken = async function () {
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

const User = new mongoose.model("User", userSchema)
const Team = mongoose.model('Team', teamSchema);
module.exports = { User, Team };