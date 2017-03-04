const LocalStrategy = require('passport-local').Strategy;
const register = require('../db/auth/index').register;

module.exports = passport => {

    passport.use('register', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
                // passReqToCallback: true
        },
        function(email, password, done) {
        	// console.log(email, password);
        	register(email, password)
        	.then(reg => {
        		if (reg.success) {
        			done(null, reg.user)
        		} else {
        			done(null, false)
        		}
        	})
        }
    ))

};
