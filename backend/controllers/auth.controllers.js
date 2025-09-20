import mongoose from "mongoose";

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import getToken from "../utils/token.js";

// Sign Up Controller
 export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "USer Already Exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    let hashedPassword = await bcrypt.hash(password, 10);

    //creating new User
    const newUser = await User.create({
      userName,
      email,
      password : hashedPassword,
    });

    const token = getToken(newUser._id);

    res.cookie("token", token, {
       secure: false,
      sameSite: "strict",
      httpOnly : true,
      maxAge : 24*60*60*1000,

    })

    return res.status(201).json({
      message : "User Created Successfully"
    })
  } catch (error) {
    console.log("error in SignUp ", error);
    return res.status(500).json({ message: "Internal Server Error" });  

  }
};

// Sign In Controller
 export const signIn = async (req,res) => {
  try {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if(!existingUser){
      return res.status(400).json({message : "User Not Found Please Sign Up"})
    }


    

    let isMatched = bcrypt.compare(password,existingUser.password);

    if(!isMatched){
      return res.status(400).json({message : "Invalid Credentials"});
    }

    const token = getToken(existingUser._id);
    res.cookie("token", token, {
      secure: false,
      sameSite: "strict",
      httpOnly : true,
      maxAge : 24*60*60*1000,
    })

     return res.status(201).json({
      message : "User Created Successfully"
    })
  } catch (error) {
    return res.status(400).json({message : "error while sign in " , error});
  }
}


//sign out 
 export const signOut = async(req,res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({message : "sign Out successfully"}); 
  } catch (error) {
    return res.status(500).json({message : "error while sign out", error}); 
  }
}