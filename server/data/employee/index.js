const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getEmployee = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('employee')
        const list = await pool.request().query(sqlQueries.emplList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (emplId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('employee')
        const employee = await pool.request().input('accountId', sql.Int, emplId).query(sqlQueries.emplById);
        return employee.recordset;
    } catch (error) {
        return error.message;
    }
}

const createEmployee = async (emplData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('employee')
        const insertEmployee = await pool.request().input('name', sql.NVarChar(25), emplData.name)
            .input('surname', sql.NVarChar(25), emplData.surname)
            .input('patronymic', sql.NVarChar(25), emplData.patronymic)
            .input('accountId', sql.Int, emplData.accountId)
            .query(sqlQueries.createEmpl);
        return insertEmployee.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateEmployee = async (emplId, emplData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('employee')
        const updated = await pool.request().input('accountId', sql.Int, emplId)
            .input('name', sql.NVarChar(25), emplData.name)
            .input('surname', sql.NVarChar(25), emplData.surname)
            .input('patronymic', sql.NVarChar(25), emplData.patronymic)
            .query(sqlQueries.updateEmpl);
        return updated.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getEmployee,
    getById,
    createEmployee,
    updateEmployee
}