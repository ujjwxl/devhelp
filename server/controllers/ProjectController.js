import projectModel from '../models/projectModel.js';

export const addProject = async (req, res) => {
  const {
    projectName,
    projectDescription,
    projectGithub,
    projectPercent,
    technologyOne,
    technologyTwo,
    technologyThree,
    firstname,
    lastname,
    username,
    profile_picture
  } = req.body;

  try {
    const newProject = new projectModel({
      projectName,
      projectDescription,
      projectGithubLink: projectGithub,
      completionPercent: projectPercent,
      technologiesUsedOne: technologyOne,
      technologiesUsedTwo: technologyTwo,
      technologiesUsedThree: technologyThree,
      developerFirstName: firstname,
      developerLastName: lastname,
      developerProfilePicture: profile_picture,
      developerUserId: username
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error: error.message });
    console.error(error);
  }
};