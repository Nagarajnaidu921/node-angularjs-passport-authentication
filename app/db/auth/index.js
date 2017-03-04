const register = require('./register');
const login = require('./login');
const fbLogin = require('./fb-login');
const User = require('./user');


module.exports = {
    register: register,
    login: login,
    fbLogin: fbLogin,
    User: User
}
