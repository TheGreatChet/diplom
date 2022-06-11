const express = require('express');
const tasklistController = require('../controllers/tasklistController');
const router = express.Router();

const {getTaskList, addTaskList} = tasklistController;

router.get('/', getTaskList);
router.post('/', addTaskList);

module.exports = {
    router: router
}