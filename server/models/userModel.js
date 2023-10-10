// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//   firstname: {
//     type: String,
//     required: true,
//   },
//   lastname: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     required: true,
//   },
//   profile_picture : {
//     type: String,
//     default: 'default-pfp.png',
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true, // Ensure email addresses are unique
//   },
//   password: {
//     type: String,
//     required: true,
//   },
// });

// const userModel = mongoose.model('users', userSchema);

// export default userModel;

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  profile_picture: {
    type: String,
    default: 'default-pfp.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  github: {
    type: String,
  },
  website: {
    type: String,
  },
  technologyOne: {
    type: String,
  },
  technologyTwo: {
    type: String,
  },
  technologyThree: {
    type: String,
  },
  // notifications: {
  //   type: mongoose.Schema.Types.ObjectId,
  // }
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'notifications', // Reference to the Notification model
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Reference to the User model
  }]
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
