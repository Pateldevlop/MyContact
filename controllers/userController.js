const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt"); 
const User = require('../models/userModel') ;
const jwt = require("jsonwebtoken");
// @desc Register users
// @route POST /api/register
// @access public
const registerUser = asyncHandler(async (req, res)=>{
    const {username, email, password} = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mendatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User are already registered!");
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password : ", hashPassword);

    const user = await User.create({
        username,
        email,
        password : hashPassword,
    });
    console.warn(`User has been created ${user}.`);

    if(user){
        res.status(401).json({_id: user.id, email: user.email });
    } else {
        res.status(400);
        throw new Error("User data us not Valid.");
    }
    // res.json({Message : "Register the User"});
});

// @desc Login user
// @route POST /api/register
// @access public
const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mendatory!");
    }
    const user = await User.findOne({email});
    // Compare password with hashed Password 
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error("Email or Password is not Valid.");
    }
    // res.json({Message : "Login User"});
});

// @desc Register users
// @route GET /api/register
// @access private
const currentUser = asyncHandler(async (req, res)=>{
    
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };