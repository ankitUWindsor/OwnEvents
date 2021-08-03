const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const atob = require('atob');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const mailer = require('./../services/mailerService');

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
            expiresIn: '1w'
        })

        const url = process.env.BASE_URL + 'api/user/confirmation/' + token;
        mailer.sendMail({
            to: user.email,
            subject: 'Email Verification',
            body: `<h1>Hi there, Welcome to Own Events</h1><br>
            <p>Please click <a href="${url}">HERE</a> to verify your email</p>`
        });

        res.header('auth-token', token).send({
            success: 200,
            message: 'User Registered Successfully',
            // authToken: token
        });
    } catch (err) {
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

        if (!user.isVerified) return res.status(400).send({
            success: 0,
            message: 'Please verify your email'
        });

        const validPassword = await bcrypt.compare(userInfo[1], user.password);
        if (!validPassword) return res.status(400).send({
            success: 0,
            message: 'Incorrect Username or Password'
        });

        const token = jwt.sign({
            _id: user._id
        }, process.env.TOKEN_SECRET, {
            expiresIn: '1w'
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

router.get('/confirmation/:token', async (req, res) => {
    try {
        const verified = jwt.verify(req.params.token, process.env.TOKEN_SECRET);
        await User.findByIdAndUpdate(verified._id, {
            isVerified: true
        })
        res.redirect('https://owneventswebapp.z13.web.core.windows.net/login');
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;