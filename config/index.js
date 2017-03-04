const config = {};
const NODE_ENV = process.env.NODE_ENV || 'development';
let CONFIG_DIR;

if (NODE_ENV === 'production') {
    CONFIG_DIR = 'production';
} else {
    CONFIG_DIR = 'development';
}

config.Auth = require(`./${CONFIG_DIR}/auth`)
config.DB = require(`./${CONFIG_DIR}/db`)


module.exports = config;