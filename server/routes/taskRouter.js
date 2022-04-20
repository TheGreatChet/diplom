const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

const {getTasks, getById, addTask, updateTask, deleteTask} = taskController;

router.get('/', getTasks);
router.get('/:id', getById);
router.post('/add', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = {
    router: router
}