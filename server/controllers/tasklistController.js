const listData = require('../data/list');

const getTaskList = async (req, res, next) => {
    try {
        const tasklist = await listData.getTaskList();
        res.send(tasklist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addTaskList = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await listData.createList(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTaskList,
    addTaskList
} 