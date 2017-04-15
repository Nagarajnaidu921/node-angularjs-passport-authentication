'use strict'

let dbConfig = {
    connectionLimit: 100,
    host: 'localhost',
    user: 'root', //Provide Your DB username
    password: 'root', //Provide Your DB password
    database: 'nodetest'  //Provide Your DB Name
};


module.exports = {
    dbConfig: dbConfig
};
