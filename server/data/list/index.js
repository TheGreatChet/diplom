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

const createList = async (data) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('list')
        const list = await pool.request().input('taskId', sql.Int, data.taskId)
            .input('employeeId', sql.Int, data.employeeId)
            .input('clientId', sql.Int, data.clientId)
            .query(sqlQueries.createList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const changeEmpl = async (taskId, data) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('list')
        const insertTask = await pool.request().input('taskId', sql.Int, taskId)
            .input('emplId', sql.Int, data.emplId)           
            .query(sqlQueries.changeEmpl);
        return insertTask.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getTaskList,
    createList,
    changeEmpl
}