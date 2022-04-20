const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getModels = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('model')
        const list = await pool.request().query(sqlQueries.modelsList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getModels
}