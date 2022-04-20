const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getTypes = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('type')
        const list = await pool.request().query(sqlQueries.typesList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getTypes
}