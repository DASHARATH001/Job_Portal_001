import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {

    const { fullName, email, phoneNumber, role, password } = req.body;

    if (!fullName || !email || !phoneNumber || !role || !password) {
      return res.status(400).json({
        message: " Something is missing",
        success: false,
      });
    }

    const file = req.file;
    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url
      }
    });

    return res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    console.log(user);

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist for this role",
        success: false,
      });
    }

    const token = jwt.sign(
      { userID: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: user.role,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${safeUser.fullName}`,
        user: safeUser,
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let cloudResponse;

    // ✅ Only upload if file exists
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content,
        {
          resource_type: "raw"   
        }
      );
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map(s => s.trim());
    }

    const userID = req.id;
    let user = await User.findById(userID);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    // Update basic fields
    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // ✅ Update resume only if file uploaded
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
      role: user.role,
    };

    return res.status(200).json({
      message: "Profile updated Successfully",
      success: true,
      user: safeUser,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "logout successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};


// clud name   dqnb7pdn3
// coludney api key  794837312676964
// API SLECRETR gZMWyLB_-AUH--8lu6RwJanpRDc