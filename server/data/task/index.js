const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getTasks = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const list = await pool.request().query(sqlQueries.tasksList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getLast = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const list = await pool.request().query(sqlQueries.lastTask);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (taskId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const task = await pool.request().input('taskId', sql.Int, taskId).query(sqlQueries.taskById);
        return task.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByDescr = async (descr) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const task = await pool.request().input('descryption', sql.NVarChar, descr).query(sqlQueries.taskByDescr);
        return task.recordset;
    } catch (error) {
        return error.message;
    }
}

const createTask = async (taskData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const insertTask = await pool.request().input('title', sql.NVarChar(50), taskData.title)
            .input('descryption', sql.NVarChar(300), taskData.descryption)
            .input('statusId', sql.Int, taskData.statusId)
            .input('car', sql.NVarChar(150), taskData.car)
            .input('typeId', sql.Int, taskData.typeId)           
            .query(sqlQueries.createTask);
        return insertTask.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByClient = async (clientId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const task = await pool.request().input('clientId', sql.Int, clientId).query(sqlQueries.tasksByClient);
        return task.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByEmpl = async (emplId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const task = await pool.request().input('emplId', sql.Int, emplId).query(sqlQueries.taskByEmpl);
        return task.recordset;
    } catch (error) {
        return error.message;
    }
}

const changeStatus = async (taskId, data) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const insertTask = await pool.request().input('taskId', sql.Int, taskId)
            .input('statusId', sql.Int, data.statusId)           
            .query(sqlQueries.changeStatus);
        return insertTask.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getTasks,
    getById,
    createTask,
    getByDescr,
    getByClient,
    getLast,
    getByEmpl,
    changeStatus
}