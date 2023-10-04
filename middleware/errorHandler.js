const constants = require('../constants.js');

module.exports = (err, req, res, next) => {

    switch (res.statusCode) {

        case constants.BAD_REQUEST:
            res.json({"title": "Bad Request", "message": err.message})
            break;
        case constants.UNAUTHORIZED:
            res.json({"title": "Uauthorized Access", "message": err.message})
            break;
        case constants.FORBIDDEN:
            res.json({"title": "Forbidden", "message": err.message})
            break;
        case constants.NOT_FOUND:
            res.json({"title": "Not Found", "message": err.message})
            break;
        case constants.INTERNAL_SERVER_ERROR:
            res.json({"title": "Internal Server Error", "message": err.message})
            break;
    
        default:
            console.log("All good!, No errors");
            break;
    }
}