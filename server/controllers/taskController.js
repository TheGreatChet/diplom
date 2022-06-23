const taskData = require('../data/task');

const getTasks = async (req, res, next) => {
    try {
        const tasks = await taskData.getTasks();
        res.send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getLast = async (req, res, next) => {
    try {
        const tasks = await taskData.getLast();
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

const getByDescr = async (req, res, next) => {
    try {
        const descr = req.params.descryption;
        const task = await taskData.getByDescr(descr);
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

const getByClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const tasks = await taskData.getByClient(clientId);
        res.send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getByEmpl = async (req, res, next) => {
    try {
        const emplId = req.params.id;
        const tasks = await taskData.getByEmpl(emplId);
        res.send(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const changeStatus = async (req, res, next) => {
    try {
        const taskId = req.params.id;
        const data = req.body;
        const updated = await taskData.changeStatus(taskId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTasks,
    getById,
    addTask,
    getByDescr,
    getByClient,
    getLast,
    getByEmpl,
    changeStatus
}