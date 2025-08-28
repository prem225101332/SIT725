const Project = require('../models/project');

const getAllProjects = async () => {
    const projects = await Project.find({});
    return projects;
}

const getProjectById = async (id) => {
    const project = await Project.findById(id);
    return project;
}

const createProject = async (projectData) => {
    const project = new Project(projectData);
    const savedProject = await project.save();
    return savedProject;
}

const updateProject = async (id, projectData) => {
    const updatedProject = await Project.findByIdAndUpdate(id, projectData, { new: true });
    return updatedProject;
}

const deleteProject = async (id) => {
    const deletedProject = await Project.findByIdAndDelete(id);
    return deletedProject;
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};