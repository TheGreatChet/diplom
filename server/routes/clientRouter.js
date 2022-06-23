const express = require('express');
const clientController = require('../controllers/clientController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const {getClients, getById, addClient, updateClient} = clientController;

router.get('/', authMiddleware, getClients);
router.get('/:id', authMiddleware, getById);
router.post('/add', addClient);
router.put('/:id', authMiddleware, updateClient);

module.exports = {
    router: router
}