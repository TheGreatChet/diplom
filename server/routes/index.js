const express = require('express');
const router = express.Router();
const accountRouter = require('./accountRouter')

router.use('/accounts', accountRouter.router)

module.exports = router