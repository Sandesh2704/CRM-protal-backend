const { User } = require("../models/user-model");
const { Task } = require("../models/task-model");


const assignTask = async (req, res) => {
    try {
        const { assignerId, recipientId, description, deadline } = req.body;

        // Get assigner and recipient data
        const assigner = await User.findById(assignerId);
        const recipient = await User.findById(recipientId);

        // Validation checks for assigner
        if (!assigner) {
            return res.status(404).json({ message: 'Assigner not found.' });
        }

        if (!recipient) {
            return res.status(404).json({ message: 'Recipient not found.' });
        }

        // Define allowed assignment based on the assigner and recipient's job position
        if (assigner.jobPosition === 'Founder' && recipient.jobPosition !== 'Manager') {
            return res.status(400).json({ message: 'Founder can only assign tasks to Managers.' });
        }

        if (assigner.jobPosition === 'Manager' && recipient.jobPosition !== 'TeamLeader') {
            return res.status(400).json({ message: 'Manager can only assign tasks to Team Leaders.' });
        }

        if (assigner.jobPosition === 'TeamLeader' && recipient.jobPosition !== 'Employee') {
            return res.status(400).json({ message: 'Team Leader can only assign tasks to Employees.' });
        }

        // Create and save the task
        const newTask = new Task({
            description,
            assignerId: assigner._id,
            recipientId: recipient._id,
            deadline,
            status: 'Pending', // Default task status
        });

        await newTask.save();

        res.status(201).json({ message: 'Task assigned successfully', task: newTask });
    } catch (err) {
        console.error('Error in assignTask:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { assignTask }