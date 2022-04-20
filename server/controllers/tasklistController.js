const listData = require('../data/list');

const getTaskList = async (req, res, next) => {
    try {
        const tasklist = await listData.getTaskList();
        res.send(tasklist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTaskList
} 