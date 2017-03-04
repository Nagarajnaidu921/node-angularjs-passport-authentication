const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AuthConfig = require('../../config/index').Auth;
const jwtSecret = AuthConfig.jwt.secret;
const tokenExpirePeriod = AuthConfig.jwt.tokenExpirePeriod;

const User = require('../db/auth/index').User;

router.route('/')
    .get((req, res) => {
        let token = req.headers.Authorization || req.headers['x-access-token'];
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) throw err;
            if (decoded) {
                let emailOrId = decoded.id || decoded.email;
                if (emailOrId) {
                    User.findUser(emailOrId).then(user => {
                        console.log(user)
                        res.json(user)
                    })
                }
            }

        });
    })


module.exports = router;
