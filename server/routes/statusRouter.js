const express = require('express');
const statusController = require('../controllers/statusController');
const router = express.Router();

const {getStatuses} = statusController;

router.get('/', getStatuses);

module.exports = {
    router: router
}