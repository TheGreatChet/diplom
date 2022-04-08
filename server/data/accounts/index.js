const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const {config} = require('dotenv');

const getAccounts = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('accounts')
        const list = await pool.request().query(sqlQueries.accountsList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAccounts
}