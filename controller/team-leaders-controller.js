const { User, Team } = require("../models/user-model");

const addTeamMember = async (req, res) => {
    try {
        const { teamLeaderId } = req.body; // Retrieve the team leader ID from req.body
        const memberData = {
            username: req.body.username,
            email: req.body.email,
            number: req.body.number,
            password: req.body.password,
            jobRole: req.body.jobRole,
            department: req.body.department,
            jobPosition: req.body.jobPosition,
            city: req.body.city,
            state: req.body.state,
            gender: req.body.gender,
            profileIMG: req.file.path, // Save the uploaded file name
        };

        // Your existing logic
        const teamLeader = await User.findById(teamLeaderId);
        if (!teamLeader || teamLeader.jobPosition !== 'Team Leader') {
            return res.status(400).json({ message: 'Invalid team leader.' });
        }

        const existingMember = await User.findOne({ email: memberData.email });
        if (existingMember) {
            return res.status(400).json({ message: 'Email already exists.' });
        }

        const newMember = new User({
            ...memberData,
            managerId: teamLeader.managerId,
            teamLeaderId: teamLeaderId,
        });

        await newMember.save();

        let team = await Team.findOne({ teamLeader: teamLeaderId });
        if (!team) {
            team = new Team({
                name: `${teamLeader.username}'s Team`,
                teamLeader: teamLeaderId,
                members: [],
            });
        }
        team.members.push(newMember._id);
        await team.save();

        res.status(201).json({ message: 'Team member added successfully', member: newMember });
    } catch (err) {
        console.error('Error in addTeamMember:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// const addTeamMember = async (req, res) => {
//     try {
//         const { teamLeaderId, memberData } = req.body;

//         const teamLeader = await User.findById(teamLeaderId);
//         if (!teamLeader || teamLeader.jobPosition !== 'Team Leader') {
//             return res.status(400).json({ message: 'Invalid team leader.' });
//         }

//         const existingMember = await User.findOne({ email: memberData.email });
//         if (existingMember) {
//             return res.status(400).json({ message: 'Email already exists.' });
//         }

//         const newMember = new User({
//             ...memberData,
//             managerId: teamLeader.managerId,
//             teamLeaderId: teamLeaderId,
//             // jobPosition: '',
//         });

//         await newMember.save();

        
//         let team = await Team.findOne({ teamLeader: teamLeaderId });
//         if (!team) {
            
//             team = new Team({
//                 name: `${teamLeader.username}'s Team`,
//                 teamLeader: teamLeaderId,
//                 members: [],
//             });
//         }
//         team.members.push(newMember._id);
//         await team.save();
        
//         res.status(201).json({ message: 'Team member added successfully', member: newMember });
//     } catch (err) {
//         console.error('Error in addTeamMember:', err);
//         res.status(500).json({ message: 'Server error' });
//     }
// };

const getTeamMember = async (req, res) => {
    try {
        const { leaderId } = req.params; 
        const teamLeader = await User.findById(leaderId);

        if (!teamLeader || teamLeader.jobPosition !== 'Team Leader') {
            return res.status(400).json({ message: 'Invalid team leader.' });
        }

        const team = await Team.findOne({ teamLeader: leaderId }).populate('members');
        if (!team) {
            return res.status(404).json({ message: 'Team not found.' });
        }

        res.status(200).json({ teamMembers: team.members });
    } catch (err) {
        console.error('Error in getTeamMember:', err);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = { getTeamMember, addTeamMember }