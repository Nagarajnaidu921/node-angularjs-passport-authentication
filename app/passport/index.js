const passport = require('passport');

function initStartagies() {
	require('./register')(passport);
	require('./login')(passport);
	require('./fb-login')(passport);
}

module.exports = {
	passport: passport,
	initStartagies: initStartagies
}
