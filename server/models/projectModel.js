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
    ref: 'users',
    required: true,
  },
  projectGithubOwner : {
    type: String,
    required: true,
  },
  projectRepoName : {
    type: String,
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
    default: "Tech1",
  },
  technologiesUsedTwo: {
    type: String,
    default: "Tech2",
  },
  technologiesUsedThree: {
    type: String,
    default: "Tech3",
  },
  projectImageOne: {
    type: String,
  },
  projectImageTwo: {
    type: String,
  },
  projectImageThree: {
    type: String,
  }
}, { timestamps: true });

const projectModel = mongoose.model('projects', abandonedProjectSchema);
export default projectModel;
