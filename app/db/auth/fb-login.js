const User = require('./user');
const successResponse = { success: true };
const failureResponse = { success: false };


function login(email, fbId, fbName) {
    return User.createFbUser(email, fbId, fbName)
        .then(user => {
            return User.getToken(user)
                .then(token => {
                    successResponse.message = 'Successfully LoggedIn With FB! You Got Your Token';
                    successResponse.token = token;
                    return successResponse;
                })
        })
}

// login('shivaraj@gmail.com', 12345, 'Yuvaraj').then(x => console.log(x))

module.exports = login;
