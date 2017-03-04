'use strict';
const registerCtrl = require('./register');
const loginCtrl = require('./login');
const fbLoginCtrl = require('./fb-login');
const profileCtrl = require('./profile');

function isAuthorized(req, res, next) {
    let token = req.headers.Authorization || req.headers['x-access-token'];
    if (token) {
        return next()
    } else {
       return res.status(403).json({
            message: 'Unauthorized Access',
            success: false
        })
    }
};

module.exports = app => {
    app.use('/register', registerCtrl);
    app.use('/login', loginCtrl);
    app.use('/auth/facebook', fbLoginCtrl);

    app.use('/api/*', isAuthorized); //Should Be Authorised To Access /api/* paths of server
    app.use('/api/me', profileCtrl)
    app.get('/*', (req, res) => res.redirect('/'));
};
