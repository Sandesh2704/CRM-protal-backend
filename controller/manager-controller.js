

const { User } = require("../models/user-model");


const addTeamLeader = async (req, res) => {
    try {
        const { managerId } = req.body; // Manager ID from the request body
        const leaderData = {
            username: req.body.username,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
            jobPosition: req.body.jobPosition,
            city: req.body.city,
            state: req.body.state,
            gender: req.body.gender,
            profileIMG: req.file.path,
            managerId: managerId // Associate team leader with the manager
        };

        const manager = await User.findById(managerId);
        if (!manager || manager.jobPosition !== 'Manager') {
            return res.status(400).json({ message: 'Invalid manager.' });
        }

        const newLeader = new User(leaderData);
        await newLeader.save();

        res.status(201).json({ message: 'Team leader added successfully', teamLeader: newLeader });
    } catch (err) {
        console.error('Error in addTeamLeader:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// View Team Leaders (for a specific manager)
const getTeamLeaders = async (req, res) => {
    try {
        const { managerId } = req.params;

        const manager = await User.findById(managerId);
        if (!manager || manager.jobPosition !== 'Manager') {
            return res.status(400).json({ message: 'Invalid manager.' });
        }

        const teamLeaders = await User.find({ managerId: managerId, jobPosition: 'Team Leader' });
        if (teamLeaders.length === 0) {
            return res.status(404).json({ message: 'No team leaders found.' });
        }

        res.status(200).json({ teamLeaders });
    } catch (err) {
        console.error('Error in getTeamLeaders:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Team Leader
const deleteTeamLeader = async (req, res) => {
    try {
        const { leaderId } = req.params;
        const teamLeader = await User.findById(leaderId);

        if (!teamLeader || teamLeader.jobPosition !== 'Team Leader') {
            return res.status(404).json({ message: 'Team leader not found.' });
        }

        await teamLeader.remove();

        res.status(200).json({ message: 'Team leader deleted successfully' });
    } catch (err) {
        console.error('Error in deleteTeamLeader:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {deleteTeamLeader, getTeamLeaders, addTeamLeader}