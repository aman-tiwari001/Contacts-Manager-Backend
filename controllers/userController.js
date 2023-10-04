const asyncHandler = require('express-async-handler');
// handle all exceptions and send to errorHandler middleware (no need to write try catch block)
const bcrypt = require('bcrypt');
const User = require('../models/userModel.js');
const jwt = require('jsonwebtoken');

//@desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    const isEmailExist = await User.findOne({email});
    if(!name || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }
    if(isEmailExist) {
        res.status(403);
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)
    const newUser = await User.create({name, email, "password":hashedPassword})
    res.status(200).json(newUser);
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const isUserExist = await User.findOne({ email });

    if(!isUserExist) {
        res.status(404);
        throw new Error("Email doesn't exist");
    }

    if(await bcrypt.compare(password, isUserExist.password)) {
        const access_token = jwt.sign({
            user: {
                name: isUserExist.name,
                email: isUserExist.email,
                id: isUserExist.id
            }
        }, process.env.JWT_SECRET_KEY,
        {
            expiresIn: '1h'
        });
        res.status(200).json({access_token});
    }
    else {
        res.status(401);
        throw new Error("Incorrect password");
    }
});

//@desc Get current user
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = {registerUser, loginUser, currentUser};