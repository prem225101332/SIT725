const projectService = require('../Services/projectService');

const getProjects = async (req, res) => {
    try {
        const projects = await projectService.getAllProjects();
        res.json({statusCode: 200, data: projects, message:"Success"});
    } catch (error) {
        res.json({statusCode: 500, data: [], message:"Error retrieving projects"});
    }
}

const getProjectById = async (req, res) => {
    try {
        const project = await projectService.getProjectById(req.params.id);
        if (!project) {
            return res.json({statusCode: 404, data: null, message:"Project not found"});
        }
        res.json({statusCode: 200, data: project, message:"Success"});
    } catch (error) {
        res.json({statusCode: 500, data: null, message:"Error retrieving project"});
    }
}

const createProject = async (req, res) => {
    try {
        const newProject = await projectService.createProject(req.body);
        res.json({statusCode: 201, data: newProject, message:"Project created successfully"});
    } catch (error) {
        res.json({statusCode: 500, data: null, message:"Error creating project"});
    }
}

const updateProject = async (req, res) => {
    try {
        const updatedProject = await projectService.updateProject(req.params.id, req.body);
        if (!updatedProject) {
            return res.json({statusCode: 404, data: null, message:"Project not found"});
        }
        res.json({statusCode: 200, data: updatedProject, message:"Project updated successfully"});
    } catch (error) {
        res.json({statusCode: 500, data: null, message:"Error updating project"});
    }
}

const deleteProject = async (req, res) => {
    try {
        const deletedProject = await projectService.deleteProject(req.params.id);
        if (!deletedProject) {
            return res.json({statusCode: 404, data: null, message:"Project not found"});
        }
        res.json({statusCode: 200, data: null, message:"Project deleted successfully"});
    } catch (error) {
        res.json({statusCode: 500, data: null, message:"Error deleting project"});
    }
}

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};