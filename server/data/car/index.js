const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getCars = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('car')
        const list = await pool.request().query(sqlQueries.carsList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (carId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('car')
        const account = await pool.request().input('accountId', sql.Int, carId).query(sqlQueries.carById);
        return account.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getCars,
    getById
}