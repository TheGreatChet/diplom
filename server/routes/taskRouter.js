const express = require('express');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const {getTasks, getById, addTask, getByDescr, getByClient, getLast, getByEmpl, changeStatus} = taskController;

router.get('/', authMiddleware, getTasks);
router.get('/:id', authMiddleware, getById);
router.get('/bydescr/:descryption', getByDescr);
router.post('/add', authMiddleware, addTask);
router.get('/byclient/:id', authMiddleware, getByClient);
router.get('/getlast/last', authMiddleware, getLast)
router.get('/byempl/:id', authMiddleware, getByEmpl)
router.put('/changestatus/:id', authMiddleware, changeStatus)

module.exports = {
    router: router
}