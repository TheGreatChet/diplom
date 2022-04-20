const express = require('express');
const modelController = require('../controllers/modelController');
const router = express.Router();

const {getModels} = modelController;

router.get('/', getModels);

module.exports = {
    router: router
}