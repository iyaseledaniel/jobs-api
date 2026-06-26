const { UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken');
const asyncWrapper = require("./async");

const auth = asyncWrapper(async(req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError("Authentication Error")
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new UnauthenticatedError("Token not provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    // console.log(decoded)
    req.user = {id:decoded.id, name:decoded.name}
    next()
});

module.exports = auth;
