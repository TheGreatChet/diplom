const express = require('express');
const clientController = require('../controllers/clientController');
const router = express.Router();

const {getClients, getById, addClient, updateClient} = clientController;

router.get('/', getClients);
router.get('/:id', getById);
router.post('/add', addClient);
router.put('/:id', updateClient);

module.exports = {
    router: router
}