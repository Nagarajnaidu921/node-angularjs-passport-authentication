const User = require('./user');

function register(email, password) {
    return User.findUser(email)
        .then(user => {
            if (user) {
                return {
                    message: 'User Already Exist',
                    success: false
                }
            } else {
                return User.createUser(email, password)
                    .then(user => {
                        return {
                            message: 'User Successfully Created',
                            success: true,
                            user: user
                        }
                    })
            }
        })
}

// register('shivarajnaidu@gmail.com', 'abcd').then(x => console.log(x))

module.exports = register;
