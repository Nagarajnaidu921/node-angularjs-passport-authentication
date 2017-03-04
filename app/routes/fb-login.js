const passport = require('../passport/index').passport;
const express = require('express');
const router = express.Router();

router.route('/')
    .get(passport.authenticate('fb-login', { session: false, scope: ['email'] }));

router.route('/callback')
    .get((req, res, next) => {
        passport.authenticate('fb-login', { session: false }, (err, user, info) => {
            if (err) {
                console.log(err)
            } else if (!user) {
                let resData = {
                    message: info.message || 'Something Went Wrong',
                    success: false
                };
                return res.json(resData)
            } else if (user) {
                let userStr = JSON.stringify(user);
                let resData = `
                <!DOCTYPE html><html><head></head><body>
                <mark>${userStr}</mark>
                <script>
                var user = ${userStr};
                sessionStorage.setItem('user', JSON.stringify(user));
                location.href = '/#!/profile';
                </script>
                </body></html>
                `
                res.send(resData)
            }
        })(req, res, next);
    })


module.exports = router;
