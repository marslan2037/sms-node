const jwt = require('jsonwebtoken');

var CONFIG = require('./config');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, CONFIG.TOKEN_SECERET);
        req = verified;
        next();
    } catch(error) {
        console.log(error)
        res.status(400).send(error);
    }
}