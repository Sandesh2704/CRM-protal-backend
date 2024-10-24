const { User } = require("../models/user-model");


const addManager = async (req, res) => {
    try {
        const { founderId } = req.body; // Get founder ID from req.body
        const managerData = {
            username: req.body.username,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
            jobPosition: 'Manager',
            city: req.body.city,
            state: req.body.state,
            gender: req.body.gender,
            profileIMG: req.file.path,
        };

        const founder = await User.findById(founderId);
        if (!founder || founder.jobPosition !== 'Founder') {
            return res.status(400).json({ message: 'Invalid founder.' });
        }

        const existingManager = await User.findOne({ email: managerData.email });
        if (existingManager) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const newManager = new User({
            ...managerData,
            founderId: founderId, // Associate manager with founder
        });
        await newManager.save();

        res.status(201).json({ message: 'Manager added successfully', manager: newManager });
    } catch (err) {
        console.error('Error in addManager:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

const getManagers = async (req, res) => {
    try {
        const { founderId } = req.params;
        const founder = await User.findById(founderId);

        if (!founder || founder.jobPosition !== 'Founder') {
            return res.status(400).json({ message: 'Invalid founder.' });
        }

        const managers = await User.find({ founderId: founderId, jobPosition: 'Manager' });
        if (managers.length === 0) {
            return res.status(404).json({ message: 'No managers found.' });
        }

        res.status(200).json({ managers });
    } catch (err) {
        console.error('Error in getManagers:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteManager = async (req, res) => {
    try {
        const { managerId } = req.params;
        const manager = await User.findById(managerId);

        if (!manager || manager.jobPosition !== 'Manager') {
            return res.status(404).json({ message: 'Manager not found.' });
        }

        await manager.remove(); // Remove manager from the database

        res.status(200).json({ message: 'Manager deleted successfully' });
    } catch (err) {
        console.error('Error in deleteManager:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {addManager, deleteManager, getManagers }