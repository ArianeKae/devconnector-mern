const express = require('express');
var router = express.Router();
const auth = require('../../../middleware/auth');
const { body, validationResult } = require('express-validator');

const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

// @route       GET api/profile/me
// @desc        Get current users profile
// @access      Private
router.get('/me', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id}).populate('user', 
        ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: 'There is no profile for this user'});
        }
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route       POST api/profile
// @desc        Creat or update the user profile.
// @access      Private
router.post('/', [
    auth, [
    body('status', 'Status is required').not().isEmpty(),
    body('skills', 'Skills is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
        company,
        website,
        location,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(locaction) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;

    if(skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    console.log(skills);

    res.send('Hello');
}
);

module.exports = router;