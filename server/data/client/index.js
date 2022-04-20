const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getClients = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('client')
        const list = await pool.request().query(sqlQueries.clientsList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (clientId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('client')
        const client = await pool.request().input('clientId', sql.Int, clientId).query(sqlQueries.clientById);
        return client.recordset;
    } catch (error) {
        return error.message;
    }
}

const createClient = async (clientData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('client')
        const insertClient = await pool.request().input('name', sql.NVarChar(25), clientData.name)
            .input('surname', sql.NVarChar(25), clientData.surname)
            .input('patronymic', sql.NVarChar(25), clientData.patronymic)
            .input('accountId', sql.Int, clientData.accountId)
            .query(sqlQueries.createClient);
        return insertClient.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateClient = async (clientId, clientData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('client')
        const updated = await pool.request().input('accountId', sql.Int, clientId)
            .input('name', sql.NVarChar(25), clientData.name)
            .input('surname', sql.NVarChar(25), clientData.surname)
            .input('patronymic', sql.NVarChar(25), clientData.patronymic)
            .query(sqlQueries.updateClient);
        return updated.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getClients,
    getById,
    createClient,
    updateClient
}