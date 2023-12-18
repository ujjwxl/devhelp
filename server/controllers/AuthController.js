import userModel from "../models/userModel.js";
import projectModel from "../models/projectModel.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import notificationModel from "../models/notificationModel.js";

export const registerUser = async (req, res) => {
  const { capitalizedFirstName, capitalizedLastName, username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new userModel({
    firstname: capitalizedFirstName,
    lastname: capitalizedLastName,
    username,
    email,
    password: hashedPassword,
    technologyOne: 'Tech1',
    technologyTwo: 'Tech2',
    technologyThree: 'Tech3'
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
  const { bio, github, website, technologyOne, technologyTwo, technologyThree, userId, profile_picture } = req.body;

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
  if(profile_picture) {
    updateData.profile_picture = profile_picture;
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

// export const createRequest = async (req, res) => {
//   const { requesterUserName, projectName, developerUserId } = req.body;
//   console.log(req.body)

//   try {
//     const user = await userModel.findOne({ _id: developerUserId });

//     if (!user) {
//       return res.status(404).json({ message: 'No user found for this id' });
//     }

//     const message = `${requesterUserName} has requested to continue ${projectName}`;

//     user.notifications.push(message);

//     // Save the updated user document
//     await user.save();
//     res.status(200).json({ message: 'Request sent successfully.' });
    
//   } catch (error) {
//     console.error("Error fetching user projects:", error);
//     res.status(500).json({ error: "Failed to fetch user projects" });
//   }
// };

// export const getNotifications = async (req, res) => {
//   const { userId } = req.params;

//   try {
   
//     res.status(200).json({ message: 'Request sent successfully.' });
    
//   } catch (error) {
//     console.error("Error fetching user notifications:", error);
//     res.status(500).json({ error: "Failed to fetch user notifications" });
//   }
// };

export const createRequest = async (req, res) => {
  const { requesterUserName, projectName, developerUserId, projectId, requesterUserId } = req.body;
  // console.log(req.body)

  try {
    const user = await userModel.findOne({ _id: developerUserId });

    if (!user) {
      return res.status(404).json({ message: 'No user found for this id' });
    }

    const message = "has requested to continue";

    const notification=new notificationModel({
      requesterId: requesterUserId,
      requesterUserName,
      receiverId: developerUserId,
      projectId,
      projectName,
      message,
      isRequest: true,
    })

    // Save the updated user document
    await notification.save();
    user.notifications.push(notification);

    // Save the updated user document
    await user.save();
    res.status(200).json({ message: 'Request sent successfully.' });
    
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};



export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    // Use the `populate` method to populate the 'notifications' field
    const user = await userModel.findOne({ _id: userId }).populate('notifications');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Now 'user.notifications' contains an array of notification documents with all fields populated
    res.status(200).json(user.notifications.reverse());
  } catch (error) {
    console.error("Error fetching user notifications:", error);
    res.status(500).json({ error: "Failed to fetch user notifications" });
  }
};


export const followUser = async (req, res) => {
  const { anotherUserId, loggedInUserId, loggedInUserName } = req.body;
  console.log(loggedInUserName);
  try {
    const currentUser = await userModel.findById(loggedInUserId);
    const targetUser = await userModel.findById(anotherUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    if (currentUser.following.includes(anotherUserId)) {
      return res.status(400).json({ message: 'You are already following this user.' });
    }

    currentUser.following.push(anotherUserId);
    await currentUser.save();

    targetUser.followers.push(loggedInUserId);
    await targetUser.save();

    const message = "started following you";

    const notification=new notificationModel({
      requesterId: loggedInUserId,
      requesterUserName: loggedInUserName,
      receiverId: anotherUserId,
      message,
      isRequest: false
    })

    // Save the updated user document
    await notification.save();
    targetUser.notifications.push(notification);

    // Save the updated user document
    await targetUser.save();

    return res.status(200).json({ message: 'You are now following this user.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.query;
  try {
    // Search for users with the given query
    const userSearchResults = await userModel.find({
      $or: [
        { username: { $regex: new RegExp(query, 'i') } },
        { firstname: { $regex: new RegExp(query, 'i') } },
        { lastname: { $regex: new RegExp(query, 'i') } },
        { technologyOne: { $regex: new RegExp(query, 'i') } },
        { technologyTwo: { $regex: new RegExp(query, 'i') } },
        { technologyThree: { $regex: new RegExp(query, 'i') } },
      ],
    });

    // Search for projects with the given query
    const projectSearchResults = await projectModel.find({
      $or: [
        { projectName: { $regex: new RegExp(query, 'i') } },
        { technologiesUsedOne: { $regex: new RegExp(query, 'i') } },
        { technologiesUsedTwo: { $regex: new RegExp(query, 'i') } },
        { technologiesUsedThree: { $regex: new RegExp(query, 'i') } },
        { projectDescription: { $regex: new RegExp(query, 'i') } },
        { projectNotes: { $regex: new RegExp(query, 'i') } },
        { developerFirstName: { $regex: new RegExp(query, 'i') } }, // Add developerFirstName
        { developerLastName: { $regex: new RegExp(query, 'i') } }, // Add developerLastName
        { developerUserName: { $regex: new RegExp(query, 'i') } }, // Add developerUserName
      ],
    });

    res.status(200).json({ users: userSearchResults, projects: projectSearchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while searching for users and projects.' });
  }
};

// export const getUserChats = async (req, res) => {
//   const { userId } = req.params;

//   userModel
//   .findOne({ _id:userId})
//   .then((user) => {
//     res.status(200).json(user);
//   })
//   .catch((error) => {
//     console.error("Error fetching user:", error);
//     res.status(500).json({ error: "Failed to fetch user" });
//   });
// }

export const getUserChats = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by their ID and populate the userChats field
    const user = await userModel.findById(userId).populate('userChats');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get the list of users with whom the user has sent or received messages
    const usersWithChats = user.userChats;

    // Send the list of users with the entire user details in the userChats field
    return res.status(200).json(usersWithChats.reverse());
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}