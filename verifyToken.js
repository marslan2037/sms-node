const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECERET);
        req = verified;
        next();
    } catch(error) {
        console.log(error)
        res.status(400).send(error);
    }
}