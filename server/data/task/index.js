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
            .input('carId', sql.Int, taskData.carId)
            .input('typeId', sql.Int, taskData.typeId)           
            .query(sqlQueries.createTask);
        return insertTask.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateTask = async (taskId, taskData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const insertTask = await pool.request().insert('taskId', sql.Int, taskId)
            .input('title', sql.NVarChar(50), taskData.title)
            .input('descryption', sql.NVarChar(300), taskData.descryption)
            .input('statusId', sql.Int, taskData.statusId)
            .input('carId', sql.Int, taskData.carId)
            .input('typeId', sql.Int, taskData.typeId)           
            .query(sqlQueries.updateTask);
        return insertTask.recordset;
    } catch (error) {
        return error.message;
    }
}

const deleteTask = async (taskId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('task')
        const deleted = await pool.request().input('taskId', sql.Int, taskId).query(sqlQueries.deleteTask);
        return deleted.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    getTasks,
    getById,
    createTask,
    updateTask,
    deleteTask,
    getByDescr
}