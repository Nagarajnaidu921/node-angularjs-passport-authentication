const FacebookStrategy = require('passport-facebook').Strategy;
const login = require('../db/auth/index').fbLogin;
const fbConfig = require('../../config/index').Auth.fb;
const FACEBOOK_APP_ID = fbConfig.clientId;
const FACEBOOK_APP_SECRET = fbConfig.secret;

module.exports = passport => {
    passport.use('fb-login', new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email']
        },
        function(accessToken, refreshToken, profile, done) {
            const email = profile.emails[0].value;
            const fbId = profile.id;
            const fbName = profile.displayName;
            login(email, fbId, fbName)
                .then(loginRes => {
                    if (loginRes.success) {
                        done(null, loginRes, { message: loginRes.message })
                    } else {
                        done(null, false, { message: loginRes.message })
                    }
                }).catch(err => done(err))
        }
    ));

};
