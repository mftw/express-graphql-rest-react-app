const jwt = require('jsonwebtoken');
const db = require('../lib/db');

const authModule = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        // console.log(decoded);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
}

authModule.superuser = (req, res, next) => {
    const superuser = db.verifySuperuser(req.userData)

    if(superuser) {
        next()
    } else {
        return res.status(401).json({message: 'Authentication failed'})
    }
}

module.exports = authModule;