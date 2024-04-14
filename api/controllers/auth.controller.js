import User from "../models/user.model.js";
import createError from "../utils/createError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const editProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.isSeller=req.body.isSeller || user.isSeller;
    user.desc=req.body.desc || user.desc;
    if (req.body.password!=="undefined") {
      const hash = bcrypt.hashSync(req.body.password, 5);
      user.password = hash;
    }

    if (req.file) {
      user.img = req.file.path;
    }

    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const file=req.file;


    const oldUser=await User.findOne({email:req.body.email})

    if(oldUser){
      return res.status(400).json({message:"Email already exists!"});
    }

    const newUser = new User({
      ...req.body,
      password: hash,
      img:file ? file.path || null:null
    });

    await newUser.save();
    res.status(201).send("User has been created.");
  } catch (err) {
    console.log(err)
    res.status(500).json({message:"Server error"});
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(404).json({message:"User not found!"});

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(400).json({message:"Wrong email or password!"});

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    res.status(500).json({message:"Server error"});
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};