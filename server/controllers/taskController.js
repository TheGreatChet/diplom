const taskData = require('../data/task');

const getTasks = async (req, res, next) => {
    try {
        const tasks = await taskData.getTasks();
        res.send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const task = await taskData.getById(taskId);
        res.send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addTask = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await taskData.createTask(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const data = req.body;
        const updated = await taskData.updateAccount(taskId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const deleted = await taskData.updateAccount(taskId);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTasks,
    getById,
    addTask,
    updateTask,
    deleteTask
}