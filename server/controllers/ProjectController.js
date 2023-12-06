import projectModel from "../models/projectModel.js";
import userModel from "../models/userModel.js";
import notificationModel from "../models/notificationModel.js";

export const addProject = async (req, res) => {
  const {
    projectName,
    projectStatus,
    projectDescription,
    gitHubRepoOwner,
    gitHubRepoName,
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
    userId,
    project_image_one,
    project_image_two,
    project_image_three,
  } = req.body;

  try {
    const newProject = new projectModel({
      projectName,
      projectStatus,
      projectDescription,
      projectGithubOwner: gitHubRepoOwner,
      projectRepoName: gitHubRepoName,
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
      projectImageOne: project_image_one,
      projectImageTwo: project_image_two,
      projectImageThree: project_image_three,
    });

    await newProject.save();
    res
      .status(201)
      .json({ message: "Project added successfully", project: newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding project", error: error.message });
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
      return res
        .status(404)
        .json({ message: "No projects found for this user" });
    }

    res.status(200).json(userProjects);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};

export const getWorkingProjectsByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user by their ID and populate the 'workingOn' field with project details
    const user = await userModel.findById(userId).populate("workingOn");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // The 'workingOn' field will now contain project details
    const workingProjects = user.workingOn;

    // Return the list of working projects
    res.status(200).json(workingProjects);
  } catch (error) {
    console.error("Error fetching working projects:", error);
    res.status(500).json({ message: "Server error" });
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

export const acceptRequest = async (req, res) => {
  const { senderId, projectName, loggedInUserName, loggedInUserId, projectId } =
    req.body;

  try {
    const user = await userModel.findOne({ _id: senderId });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    user.workingOn.push(projectId);
    await user.save();

    const message = " accepted your request to continue ";

    const notification = new notificationModel({
      requesterId: loggedInUserId,
      requesterUserName: loggedInUserName,
      receiverId: senderId,
      projectName,
      projectId,
      message,
    });

    // Save the updated user document
    await notification.save();
    user.notifications.push(notification);

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};

export const declineRequest = async (req, res) => {
  const { senderId, projectName, loggedInUserName, loggedInUserId, projectId } =
    req.body;

  try {
    const user = await userModel.findOne({ _id: senderId });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const message = " has declined your request to continue ";

    const notification = new notificationModel({
      requesterId: loggedInUserId,
      requesterUserName: loggedInUserName,
      receiverId: senderId,
      projectName,
      projectId,
      message,
    });

    // Save the updated user document
    await notification.save();
    user.notifications.push(notification);

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user projects:", error);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};

export const removeNotification = async (req, res) => {
  const { notificationId } = req.params;

  try {
    // Find the notification by ID and delete it
    const deletedNotification = await notificationModel.findByIdAndDelete(
      notificationId
    );

    if (!deletedNotification) {
      return res.status(404).json({ message: "No notification found" });
    }

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    res.status(500).json({ error: "Failed to delete notification" });
  }
};

export const saveProject = async (req, res) => {
  const { loggedInUserId, projectId } = req.body;

  try {
    const user = await userModel.findOne({ _id: loggedInUserId });

    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }

    const isProjectSaved = user.savedProjects.includes(projectId);

    if (isProjectSaved) {
      return res.status(200).json({ message: "Project already saved" });
    } else {
      user.savedProjects.push(projectId);
      await user.save();
      return res.status(200).json(user);
    }
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ error: "Failed to save project" });
  }
};

export const getSavedProjects = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by their ID and populate the savedProjects field
    const user = await userModel.findById(userId).populate("savedProjects");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // The 'user.savedProjects' field will now contain populated project documents
    res.status(200).json(user.savedProjects);
  } catch (error) {
    console.error("Error fetching saved projects for the user:", error);
    res.status(500).json({ error: "Failed to fetch saved projects" });
  }
};

export const getAbandonedProjects = async (req, res) => {
  try {
    // Find projects with projectStatus "abandoned"
    const abandonedProjects = await projectModel.find({
      projectStatus: "abandoned",
    });

    if (!abandonedProjects) {
      return res.status(404).json({ message: "No abandoned projects found" });
    }

    res.status(200).json(abandonedProjects);
  } catch (error) {
    console.error("Error fetching abandoned projects:", error);
    res.status(500).json({ error: "Failed to fetch abandoned projects" });
  }
};

export const getCollaborateProjects = async (req, res) => {
  try {
    // Find projects with projectStatus "collaborate"
    const collaborateProjects = await projectModel.find({
      projectStatus: "collaborate",
    });

    if (!collaborateProjects) {
      return res.status(404).json({ message: "No collaborate projects found" });
    }

    res.status(200).json(collaborateProjects);
  } catch (error) {
    console.error("Error fetching collaborate projects:", error);
    res.status(500).json({ error: "Failed to fetch collaborate projects" });
  }
};
