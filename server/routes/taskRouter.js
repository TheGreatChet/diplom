const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

const {getTasks, getById, addTask, updateTask, deleteTask, getByDescr, getByClient, getLast, getByEmpl, changeStatus} = taskController;

router.get('/', getTasks);
router.get('/:id', getById);
router.get('/bydescr/:descryption', getByDescr);
router.post('/add', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/byclient/:id', getByClient);
router.get('/getlast/last', getLast)
router.get('/byempl/:id', getByEmpl)
router.put('/changestatus/:id', changeStatus)

module.exports = {
    router: router
}