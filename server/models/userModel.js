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
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
