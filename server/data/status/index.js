const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getStatuses = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('status')
        const list = await pool.request().query(sqlQueries.statusList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getStatuses
}