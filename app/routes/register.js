const passport = require('../passport/index').passport;
const express = require('express');
const router = express.Router();
const User = require('../db/auth/index').User;

router.route('/')
    .post((req, res, next) => {
        passport.authenticate('register', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err)
            } else if (!user) {
                let resData = {
                    message: 'User Already Exists',
                    success: false
                };
                return res.json(resData)
            } else if (user) {
                User.getToken(user).then(token => {
                    let resData = {
                        message: 'Successfully Registered',
                        success: true,
                        token: token
                    };
                    res.json(resData)

                })
            }
        })(req, res, next);
    });

module.exports = router;
