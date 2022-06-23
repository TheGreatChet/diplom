const express = require('express');
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const {getEmpl, getById, addEmpl, updateEmpl} = employeeController;

router.get('/', getEmpl);
router.get('/:id', authMiddleware, getById);
router.get('/add', authMiddleware, addEmpl);
router.put('/:id', authMiddleware, updateEmpl);

module.exports = {
    router: router
}