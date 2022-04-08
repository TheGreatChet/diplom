const express = require('express');
const eventController = require('../controllers/accountController');
const router = express.Router();

const {getAccounts} = eventController;

router.get('/', getAccounts);

module.exports = {
    router: router
}