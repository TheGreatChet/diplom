const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

const {getTasks} = taskController;

router.get('/', getTasks);

module.exports = {
    router: router
}