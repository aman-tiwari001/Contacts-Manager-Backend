const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.Authorization || req.headers.authorization;
    if(!token) {
        res.status(401);
        throw new Error("No auth token provided");
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            res.status(401);
            throw new Error("User is not authorized");
        }
        else {
            req.user = decoded.user;
            next();
        }
    })
}