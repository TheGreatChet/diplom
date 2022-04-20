const chatData = require('../data/chat');

const getChats = async (req, res, next) => {
    try {
        const accounts = await chatData.getChats();
        res.send(accounts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const chatId = req.params.id;
        const chat = await chatData.getById(chatId);
        res.send(chat);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addMessage = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await chatData.sendMessage(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteMessage = async (req, res, next) => {
    try {
        const chatId = req.params.id;
        const deleted = await chatData.deleteMessage(chatId);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getChats,
    getById,
    addMessage,
    deleteMessage
}