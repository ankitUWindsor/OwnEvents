const router = require('express').Router();
const verifyToken = require('../middleware/verifytoken');
const User = require('../models/user')
router.get('/', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user._id
        });
        if (!user) return res.status(400).send({
            success: 0,
            message: 'User not found'
        });
        res.status(200).send({
            success: 200,
            message: '',
            result: {
                name: user.name,
                email: user.email,
                id: user._id,
                userType: user.userType,
                interests: user.interests,
                createdDate: user.date
            }
        });
    } catch (err) {
        res.status(400).send(err);
    }
});




router.post('/update', verifyToken, async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.user._id
        });
        if(!user){
            res.send({
                message: 'User not defined'
            });    
        }
        const updatedUser = {
            name : req.body.name,
            interests: req.body.interests,
        }

        User.findByIdAndUpdate(req.user._id, updatedUser).then( async (result) => {
            const updatedUser = await User.findOne({
                _id: req.user._id
            });
            res.send({
                success: 200,
                message: 'User Info Updated',
                result: {
                    name: updatedUser.name,
                    email: updatedUser.email,
                    id: updatedUser._id,
                    userType: updatedUser.userType,
                    interests: updatedUser.interests,
                    createdDate: updatedUser.date
                }
            });
        }) 
        
    } catch (error) {
        res.status(400).send(error);
    }
});
module.exports = router;