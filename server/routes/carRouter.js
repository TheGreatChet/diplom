const express = require('express');
const carController = require('../controllers/carController');
const router = express.Router();

const {getCars, getById} = carController;

router.get('/', getCars);
router.get('/:id', getById);

module.exports = {
    router: router
}