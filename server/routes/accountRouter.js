const express = require('express');
const accountController = require('../controllers/accountController');
const clientController = require('../controllers/clientController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')
const {getAccounts, addAccount, updateAccount, getByLogin, getById, login} = accountController;
const {addClient} = clientController

router.get('/', roleMiddleware([1]), getAccounts)
router.post('/reg', addAccount)
router.get('/:id', getById)
router.put('/:id', updateAccount)
router.get('/getbylogin/:login', getByLogin)
router.post('/login', login)

module.exports = {
    router: router
}