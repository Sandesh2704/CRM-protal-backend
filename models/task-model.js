const mongoose = require("mongoose")
const Schema = mongoose.Schema;


const taskSchema = new mongoose.Schema({
    description: { type: String, required: true },  // Task description
    assignerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    recipientId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    deadline: { type: Date, required: false },  // Task deadline
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
}, { timestamps: true });

const Task = new mongoose.model("Task", taskSchema)
module.exports = { Task};