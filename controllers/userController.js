// UserController.js{
require("dotenv").config();
const User = require('../models/users');
const Customer = require('../models/customers')
const vendor = require('../models/vendors')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const signup = async(req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.params.role;
    try{
        const existingUser = await User.findOne({email: email});
        if (existingUser)
        {
            return res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const result = await User.create({
            // username: username,
            password: hashedPassword,
            email: email,
            role: role
        });
        if (role=="buyer")
        {
            const customer = await Customer.create({
                name: name,
                userId: result._id
            });
        }
        if (role == "seller")
        {
            const stallName = req.body.stallName;
            const Vendor = await vendor.create({
                name: name,
                userId: result._id,
                stallName: stallName

            });
        }
        const token = jwt.sign({email: result.email, id: result._id},SECRET_KEY);
        const expiresInMinutes = 60;
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expiresInMinutes * 60 * 1000);
        res.cookie('token', token, { expires: expirationDate, httpOnly: true });
        // res.status(201).json({user: result, token: token});
        if (role == "seller")
        {
            res.redirect('/vendors/vendorHome');
        }
        else if (role == "buyer")
        {
            res.redirect('/customers/customerHome');
        }
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Something Went Wrong"});
    }
};

const signin = async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const existingUser = await User.findOne({email: email});
        if(!existingUser){
            return res.status(400).json({message: "User not found"});
        }
        const matchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchedPassword)
        return res.status(400).json({message: "Invalid Credentials"});
        const token = jwt.sign({email: existingUser.email, id: existingUser._id},SECRET_KEY);
          const expiresInMinutes = 60;
        const expirationDate = new Date();
        expirationDate.setTime(expirationDate.getTime() + expiresInMinutes * 60 * 1000);
        res.cookie('token', token, { expires: expirationDate, httpOnly: true });
        // res.status(201).json({user: existingUser, token: token});
        if (existingUser.role == "seller")
        {
            res.redirect('/vendors/vendorHome');
        }
        else if (existingUser.role == "buyer")
        {
            res.redirect('/customers/customerHome');
        }
    }catch(err){
        res.status(404).json({message: "User not found"});
    }
};

module.exports = {
  signup: signup,
  signin: signin
};

