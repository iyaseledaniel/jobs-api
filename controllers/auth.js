const { BadRequestError, NotFoundError, UnauthenticatedError, ConflictError } = require("../errors");
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt')
const asyncWrapper = require("../middleware/async");
const userModel = require('../models/User');
const jwt = require("jsonwebtoken");

const register = asyncWrapper(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError("Please provide name,email and password");
    }
    const existingUser = await userModel.findOne({email:email.trim().toLowerCase()})
    if (existingUser){
        throw new ConflictError("Email already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password.trim(), salt);

    const newuser = new userModel({
        name: name.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        password: hashedPassword
    })
    const user = await userModel.create(newuser)
    const token = createJWTToken({id:user._id,name:user.name}); 
    res
        .status(StatusCodes.CREATED)
        .json({ msg: `Registration sucessful for ${user.name} with email: ${user.email} and id :${user._id}`, token: token })
});

const login = asyncWrapper(async (req, res, next) => {
    const {email, password} = req.body;

    if (!email || !password){
        throw new BadRequestError("Email and Password needed to sign in.")
    }

    const user = await userModel.findOne({email:email.trim().toLowerCase()});
    if (!user){
        throw new UnauthenticatedError("User not found");
    }
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    if(!isMatch){
        throw new UnauthenticatedError("Invalid Password")
    }

    const token = createJWTToken({id:user._id, name:user.name});
    res.status(StatusCodes.OK).json({mssg: "Login Successful", user:{name:user.name, id: user._id}, token})
});

const createJWTToken = ({id,name})=>{
    return jwt.sign({id,name}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_SPAN})
}

module.exports = { login, register };