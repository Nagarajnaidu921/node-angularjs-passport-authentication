const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('./app/passport/index').passport;
const initStartagies = require('./app/passport/index').initStartagies;
// const passport   = require('passport');

app.use(express.static('www'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});
app.use(passport.initialize());
initStartagies()

require('./app/routes/index')(app);

app.listen(port, () => console.log(`Server Listening At Port ${port}`))
