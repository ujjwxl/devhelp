import mongoose from 'mongoose';

// const { Schema, model } = mongoose;

const abandonedProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
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
  developerUserId: {
    type: String,
    // required: true,
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
  technologiesUsed: {
    type: [String],
  },
});

const projectModel = mongoose.model('projects', abandonedProjectSchema);
export default projectModel;
