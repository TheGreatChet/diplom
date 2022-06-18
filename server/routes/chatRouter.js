const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

const {getChats, getById, addMessage} = chatController;

router.get('/', getChats);
router.get('/:id', getById);
router.post('/sendmessage', addMessage)

module.exports = {
    router: router
}