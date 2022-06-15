const express = require('express');
const tasklistController = require('../controllers/tasklistController');
const router = express.Router();

const {getTaskList, addTaskList, changeEmpl} = tasklistController;

router.get('/', getTaskList);
router.post('/', addTaskList);
router.put('/changeempl/:id', changeEmpl);

module.exports = {
    router: router
}