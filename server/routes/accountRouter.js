const express = require('express');
const accountController = require('../controllers/accountController');
const router = express.Router();

const {getAccounts, addAccount, updateAccount, getByLogin, getById} = accountController;

router.get('/', getAccounts)
router.post('/reg', addAccount)
router.get('/:id', getById)
router.put('/:id', updateAccount)
router.get('/getbylogin/:login', getByLogin)

module.exports = {
    router: router
}