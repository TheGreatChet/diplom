const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

const {getChats, getById, addMessage, deleteMessage} = chatController;

router.get('/', getChats);
router.get('/:id', getById);
router.post('/sendmessage', addMessage)
router.delete('/:id', deleteMessage)

module.exports = {
    router: router
}