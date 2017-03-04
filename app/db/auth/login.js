const User = require('./user');
const successResponse = { success: true };
const failureResponse = { success: false };


function login(email, password) {
    if (!email || !password) {
        return new Promise((resolve, reject) => {
            if (!email) {
                failureResponse.message = 'Email Fileld Should Not Be Empty';
                resolve(failureResponse)
            } else if (!password) {
                failureResponse.message = 'Password Fileld Should Not Be Empty';
                resolve(failureResponse)
            }
        })
    }
    return User.findUser(email)
        .then(user => {
            if (!user) {
                failureResponse.message = 'User Not Exist! Please Resgister As New User';
                return failureResponse
            } else {
                let hashedPassword = user.password;
                return User.isPasswordMatched(password, hashedPassword)
                    .then(isMatched => {
                        if (isMatched) {
                            return User.getToken(user)
                                .then(token => {
                                    successResponse.message = 'Successfully LoggedIn! You Got Your Token';
                                    successResponse.token = token;
                                    return successResponse;
                                })
                        }
                        failureResponse.message = 'Wrong Password';
                        return failureResponse;
                    })
            }
        })

}

// login('shivarajnaidu@gmail.com', 'abcd').then(r => console.log(r)).catch(e => console.log(e))

module.exports = login;
