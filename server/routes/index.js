const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const accountRouter = require('./accountRouter')
const chatRouter = require('./chatRouter')
const clientRouter = require('./clientRouter')
const employeeRouter = require('./employeeRouter')
const listRouter = require('./listRouter')
const statusRouter = require('./statusRouter')
const taskRouter = require('./taskRouter')
const typeRouter = require('./typeRouter')


router.use('/accounts', accountRouter.router)
router.use('/taskchat', chatRouter.router)
router.use('/clients', clientRouter.router)
router.use('/employee', employeeRouter.router)
router.use('/tasklist', authMiddleware, listRouter.router)
router.use('/status', statusRouter.router)
router.use('/tasks', taskRouter.router)
router.use('/type', authMiddleware, typeRouter.router)

module.exports = router