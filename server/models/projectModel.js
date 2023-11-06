import mongoose from 'mongoose';

const abandonedProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  projectStatus:{
    type:String,
    required: true,
  },
  projectDescription: {
    type: String,
    required: true,
  },
  developerFirstName: {
    type: String,
    // required: true,
  },
  developerLastName: {
    type: String,
    // required: true,
  },
  developerProfilePicture: {
    type: String,
  },
  developerUserName: {
    type: String,
    // required: true,
  },
  developerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectGithubLink: {
    type: String,
    required: true,
  },
  completionPercent: {
    type: Number,
    default: 0,
  },
  projectNotes: {
    type: String,
  },
  technologiesUsedOne: {
    type: String,
  },
  technologiesUsedTwo: {
    type: String,
  },
  technologiesUsedThree: {
    type: String,
  }
}, { timestamps: true }); // Add this line to enable timestamps

const projectModel = mongoose.model('projects', abandonedProjectSchema);
export default projectModel;
