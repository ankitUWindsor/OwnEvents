const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const mailService = require('../service/mailer');

router.post('/register', async (req, res) => {
    try {
        const userAlreadyExists = await User.findOne({
            email: req.body.email
        });
        if (userAlreadyExists) {
            return res.status(400).send({
                success: 0,
                message: 'Email Already Exists.'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(atob(req.body.password), salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            userType: req.body.userType
        });
        const savedUser = await user.save();


        const token = jwt.sign({
            _id: savedUser._id
        }, process.env.TOKEN_SECRET, {
            expiresIn: '4h'
        })

        res.header('auth-token', token).send({
            success: 200,
            message: 'User Registered Successfully',
            authToken: token
        });
    } catch (err) {
        console.log('err', err);
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userInfo = atob(req.header('user-token')).split(':@#');
        const userType = req.body.userType
        const user = await User.findOne({
            email: userInfo[0],
            userType
        });
        if (!user) return res.status(400).send({
            success: 0,
            message: 'Incorrect Username or Password'
        });

        const validPassword = await bcrypt.compare(userInfo[1], user.password);
        if (!validPassword) return res.status(400).send({
            success: 0,
            message: 'Incorrect Username or Password'
        });

        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET, {
            expiresIn: '4h'
        })

        res.header('auth-token', token).send({
            success: 200,
            message: 'Login Successful!',
            authToken: token
        });

    } catch (err) {
        res.status(400).send(err);
    }
});


router.post('/forget-password', async (req, res) => {
    try {

        // check request have expected data or not
        if (!req.body.email || !req.body.userType)
            return res.status(400).send({
                success: 0,
                message: 'Missing some input data.'
            });

        const userType = req.body.userType
        const user = await User.findOne({
            email: req.body.email,
            userType
        });
        if (!user && user.email) return res.status(404).send({
            success: 0,
            message: 'User not found'
        });

        const forgetPasswordToken = jwt.sign({
            _id: user._id,
            isForgetPassword: true,
            createdAt: Date.now()
        }, process.env.TOKEN_SECRET, {
            expiresIn: '4h'
        })

        const link = `${process.env.FRONT_URL}reset-password/${forgetPasswordToken}`

        try {
            await mailService.sendMail({to: user.email, subject: 'Forget Password', text: link})

            res.send({
                success: 1,
                message: 'Mail is sent on your email account for the reset password.',
            });

        } catch (e) {
            res.statusCode(500).send({
                success: 1,
                message: 'Error in mail send',
            });
        }
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/reset-password', async (req, res) => {
    try {
        // check request have expected data or not
        if (!req.headers['reset-token'] || !req.body.password)
            return res.status(400).send({
                success: 0,
                message: 'Missing some input data.'
            });

        try {
            const decodedData = jwt.verify(req.headers['reset-token'], process.env.TOKEN_SECRET);
            const user = await User.findOne({
                _id: decodedData._id,
            });
            if (!user) return res.status(404).send({
                success: 0,
                message: 'User not found'
            });

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(atob(req.body.password), salt);

            user.password = hashedPassword;

            await user.save();

            res.send({
                success: 1,
                message: 'Password set successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(400).send('Invalid Token');
        }
    } catch (err) {
        res.status(400).send(err);
    }
});


module.exports = router;