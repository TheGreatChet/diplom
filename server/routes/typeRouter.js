const express = require('express');
const typeController = require('../controllers/typeController');
const router = express.Router();

const {getTypes} = typeController;

router.get('/', getTypes);

module.exports = {
    router: router
}