const express = require('express');
const tasklistController = require('../controllers/tasklistController');
const router = express.Router();

const {getTaskList} = tasklistController;

router.get('/', getTaskList);

module.exports = {
    router: router
}