'use strict';

const pool = require('../db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const AuthConfig = require('../../../config/index').Auth;
const jwtSecret = AuthConfig.jwt.secret;
const tokenExpirePeriod = AuthConfig.jwt.tokenExpirePeriod;

function getToken(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(user, jwtSecret, { expiresIn: tokenExpirePeriod }, (err, token) => {
            if (err) reject(err);
            resolve(token)
        });
    })
}

function exeQuery(SQLQuery) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);
            connection.query(SQLQuery, (err, results) => {
                connection.release();
                if (err) reject(err);
                resolve(results)
            });

        });

    })
}

function findUser(emailOrId) {
    let SQLQuery;
    if (Number(emailOrId)) {
        SQLQuery = `SELECT * FROM users WHERE id = "${emailOrId}"`;
    } else {
        SQLQuery = `SELECT * FROM users WHERE email = "${emailOrId}"`;
    };

    return exeQuery(SQLQuery)
        .then(result => {
            if (result.length > 0) {
                return result[0];
            } else {
                return null;
            }
        })
}

function createUser(email, password) {
    return bcrypt.hash(password, saltRounds)
        .then(hash => {
            let SQLQuery = `INSERT INTO users SET email = "${email}", password = "${hash}"`;
            return exeQuery(SQLQuery)
        }).then(result => {
            let user = {
                id: result.insertId,
                email: email
            };

            return user;
        })
}

function createFbUser(email, fbId, fbName) {
    return findUser(email)
        .then(user => {
            if (user) {
                let SQLQuery = `UPDATE users SET fbid = "${fbId}", fbname = "${fbName}" WHERE email = "${email}"`;
                return exeQuery(SQLQuery)
                    .then(result => {
                        return {
                            id: user.id,
                            email: user.email,
                            fbId: fbId
                        };
                    })
            } else {
                let SQLQuery = `INSERT INTO users SET fbid = "${fbId}", fbname = "${fbName}", email = "${email}"`;
                return exeQuery(SQLQuery)
                    .then(result => {
                        return {
                            id: result.insertId,
                            email: email,
                            fbId: fbId
                        };
                    })
            }
        })

}

function isPasswordMatched(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

module.exports = {
    createUser: createUser,
    findUser: findUser,
    findUserByEmail: findUser,
    findUserById: findUser,
    getToken: getToken,
    isPasswordMatched: isPasswordMatched,
    createFbUser: createFbUser
};
