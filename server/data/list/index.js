const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getTaskList = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('list')
        const list = await pool.request().query(sqlQueries.listList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getTaskList
}