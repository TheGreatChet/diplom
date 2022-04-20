const express = require('express');
const employeeController = require('../controllers/employeeController');
const router = express.Router();

const {getEmpl, getById, addEmpl, updateEmpl} = employeeController;

router.get('/', getEmpl);
router.get('/:id', getById);
router.get('/add', addEmpl);
router.put('/:id', updateEmpl);

module.exports = {
    router: router
}