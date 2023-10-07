import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstname,
    lastname,
    username,
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
          username: user.username,
          userId: user._id,
          profile_picture: user.profile_picture
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
    console.log(error);
  }
};

// export const updateUserProfile = async (req, res) => {
//   const { bio, github, website, technologyOne, technologyTwo, technologyThree, userId } = req.body;

//   userModel.findByIdAndUpdate(userId, { bio, github, website, technologyOne, technologyTwo, technologyThree })
//     .then(updatedUser => {
//       if (!updatedUser) {
//         return res.status(404).json({ message: 'User not found' });
//       }

//       res.status(200).json(updatedUser);
//     })
//     .catch(error => {
//       console.error('Error in updating user profile:', error);
//       res.status(500).json({ message: 'Error updating profile' });
//     });
// };

export const updateUserProfile = async (req, res) => {
  const { bio, github, website, technologyOne, technologyTwo, technologyThree, userId } = req.body;

  // Create an empty update object
  const updateData = {};

  // Only include fields in the update if they have a value
  if (bio) {
    updateData.bio = bio;
  }
  if (github) {
    updateData.github = github;
  }
  if (website) {
    updateData.website = website;
  }
  if (technologyOne) {
    updateData.technologyOne = technologyOne;
  }
  if (technologyTwo) {
    updateData.technologyTwo = technologyTwo;
  }
  if (technologyThree) {
    updateData.technologyThree = technologyThree;
  }

  userModel.findByIdAndUpdate(userId, updateData, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(updatedUser);
    })
    .catch(error => {
      console.error('Error in updating user profile:', error);
      res.status(500).json({ message: 'Error updating profile' });
    });
};

export const getUserDetails = async (req, res) => {

  const { userId } = req.body;

  userModel
    .findOne({ _id:userId})
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    });
};