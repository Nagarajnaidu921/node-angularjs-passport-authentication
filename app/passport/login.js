const LocalStrategy = require('passport-local').Strategy;
const login = require('../db/auth/index').login;

module.exports = passport => {

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
                // passReqToCallback: true
        },
        function(email, password, done) {
            // console.log(email, password);
            login(email, password)
                .then(loginRes => {
                    if (loginRes.success) {
                        done(null, loginRes, { message: loginRes.message })
                    } else {
                        done(null, false, { message: loginRes.message })
                    }
                }).catch(err => done(err))
        }
    ))

};
