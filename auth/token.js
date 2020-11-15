const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');

const secret = process.env.JWT_SECRET || "shh don't tell anyone";

async function generateToken(user){
    const payload = {
        subject: user.id,
    };

    const options = {
        expiresIn: "24h"
    };

    return jwt.sign(payload, secret, options);
}

module.exports = {
    secret,
    generateToken
}