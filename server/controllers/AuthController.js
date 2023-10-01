import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error)
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "This email does not exist" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid password" });
      } else {
        const token = jwt.sign(
          {
            email: user.email,
            name: user.name,
            _id: user._id,
          },
          process.env.JWT_SECRET
        );
        return res.status(200).json({
          message: "Login successful",
          token,
          email: user.email,
          name: user.firstname,
          lastname: user.lastname,
          userId: user._id,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
    console.log(error);
  }
};
