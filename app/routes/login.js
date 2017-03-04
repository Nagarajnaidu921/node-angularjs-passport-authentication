const passport = require('../passport/index').passport;
const express = require('express');
const router = express.Router();

router.route('/')
    .post((req, res, next) => {
        passport.authenticate('login', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err)
            } else if (!user) {
                let resData = {
                    message: info.message || 'Something Went Wrong',
                    success: false
                };
                return res.json(resData)
            } else if (user) {
                res.json(user)
            }
        })(req, res, next);
    })


module.exports = router;
