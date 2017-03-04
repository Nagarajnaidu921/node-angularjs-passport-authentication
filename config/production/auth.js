const fb = {
    clientId: '', // Provide Your FB App ID
    secret: '' //Provide Your FB App Secret
}

const local = {
    secret: 'yuvaraj'
}

const jwt = {
    secret: 'yuvaraj',
    tokenExpirePeriod: (60 * 60 * 2) //expire time in seconds or we can also use string like "2h";
}


module.exports = {
    jwt: jwt,
    local: local,
    fb: fb
}
