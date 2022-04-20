const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

const {getAccounts, getById, addAccount, updateAccount} = accountController;

router.get('/', getAccounts);
router.get('/:id', getById);
router.post('/add', addAccount)
router.put('/:id', updateAccount)

module.exports = {
    router: router
}