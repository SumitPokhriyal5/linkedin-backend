const express = require("express");
const { UserModel } = require("../models/User.model");
require('dotenv').config();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  try {
    const alreadyUser = await UserModel.findOne({ email });
    if (alreadyUser) res.send("User already exist, please login");
    else {
      bcrypt.hash(
        password,
        Number(process.env.saltRounds),
        async (err, hash) => {
          if (hash) {
            const user = new UserModel({
              name,
              email,
              gender,
              password: hash,
              age,
              city,
            });
            await user.save();
            res.send('Registered')
          } else {
            res.send(`Error Occurred while Registering: ${err}`);
          }
        }
      );
    }
  } catch (err) {
    res.send(`Error Occurred while Registering: ${err}`);
  }
});

userRouter.post("/login", async (req, res) => {
    const {email,password}=req.body;
  try {
    const user=await UserModel.findOne({email});
    bcrypt.compare(password, user.password, (err, result)=> {
        if(result){
            const token=jwt.sign({ userID: user._id }, process.env.secretKey);
            res.send({"msg":"Login Successfull","token":token});
        }
        else{
            res.send(`Wrong Credentials: ${err}`);
        }
    });
  } catch (err) {
    res.send(`Wrong Credentials: ${err}`);
  }
});

module.exports={
    userRouter
}
