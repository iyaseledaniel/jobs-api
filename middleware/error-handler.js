const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const userModel = require('../models/User');
const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  console.error(err.message)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg:'Something went wrong' })
}

module.exports = errorHandlerMiddleware
