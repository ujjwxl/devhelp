import projectModel from '../models/projectModel.js';

export const addProject = async (req, res) => {
  const {
    projectName,
    projectDescription,
    projectGithub,
    projectPercent,
    projectNotes,
    technologyOne,
    technologyTwo,
    technologyThree,
    firstname,
    lastname,
    username,
    profile_picture,
    userId
  } = req.body;

  try {
    const newProject = new projectModel({
      projectName,
      projectDescription,
      projectGithubLink: projectGithub,
      completionPercent: projectPercent,
      projectNotes,
      technologiesUsedOne: technologyOne,
      technologiesUsedTwo: technologyTwo,
      technologiesUsedThree: technologyThree,
      developerFirstName: firstname,
      developerLastName: lastname,
      developerProfilePicture: profile_picture,
      developerUserName: username,
      developerUserId: userId,
    });

    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    res.status(500).json({ message: 'Error adding project', error: error.message });
    console.error(error);
  }
};

export const getAllProjects = async (req, res) => {
  
  projectModel
    .find()
    .then((projects) => {
      res.status(200).json(projects.reverse());
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    });
};

export const getProjectsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const userProjects = await projectModel.find({ developerUserId: userId });

    if (!userProjects) {
      return res.status(404).json({ message: 'No projects found for this user' });
    }

    res.status(200).json(userProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};

export const getProject = async (req, res) => {

  const { projectId } = req.params;
  
  projectModel
    .findOne({ _id: projectId })
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((error) => {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    });
};