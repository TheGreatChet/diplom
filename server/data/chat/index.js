const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getChats = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('chat')
        const list = await pool.request().query(sqlQueries.chatList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (chatId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('chat')
        const account = await pool.request().input('chatId', sql.Int, chatId).query(sqlQueries.chatById);
        return account.recordset;
    } catch (error) {
        return error.message;
    }
}

const sendMessage = async (chatData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('chat')
        const insertMessage = await pool.request().input('text', sql.NVarChar(sql.MAX), chatData.text)
                                                  .input('image', sql.VarBinary(sql.MAX), chatData.image)
                                                  .input('taskId', sql.Int, chatData.taskId)
                                                  .input('senderId', sql.Int, chatData.senderId)                                                 
                                                  .query(sqlQueries.sendMessage);
        return insertMessage.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteMessage = async (chatId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('chat')
        const deleted = await pool.request().input('chatId', sql.Int, chatId).query(sqlQueries.deleteMessage);
        return deleted.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getChats,
    getById,
    sendMessage,
    deleteMessage
}