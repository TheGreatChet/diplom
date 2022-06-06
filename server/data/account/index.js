const utils = require('../utils');
const cfg = require('../../config');
const sql = require('mssql');
const { config } = require('dotenv');

const getAccounts = async () => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('account')
        const list = await pool.request().query(sqlQueries.accountsList);
        return list.recordset;
    } catch (error) {
        return error.message;
    }
}

const getById = async (accountId) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('account')
        const account = await pool.request().input('accountId', sql.Int, accountId).query(sqlQueries.accountById);
        return account.recordset;
    } catch (error) {
        return error.message;
    }
}

const createAccount = async (accountData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('account')
        const insertAccount = await pool.request().input('login', sql.NVarChar(255), accountData.login)
            .input('password', sql.NVarChar(20), accountData.password)
            .input('roleId', sql.Int, accountData.roleId)
            .input('profileImage', sql.VarBinary(sql.MAX), accountData.profileImage)
            .query(sqlQueries.createAccount);
        return insertAccount.recordset;
    } catch (error) {
        return error.message;
    }
}

const updateAccount = async (accountId, accountData) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('account')
        const update = await pool.request().input('accountId', sql.Int, accountId)
            .input('login', sql.NVarChar(20), accountData.login)
            .input('password', sql.NVarChar(20), accountData.password)
            .input('roleId', sql.Int, accountData.roleId)
            .input('profileImage', sql.NVarChar(sql.MAX), accountData.profileImage)
            .query(sqlQueries.updateAccount);
        return update.recordset;
    } catch (error) {
        return error.message;
    }
}

const getByLogin = async (login) => {
    try {
        let pool = await sql.connect(cfg.sql);
        const sqlQueries = await utils.loadSqlQueries('account')
        const account = await pool.request().input('login', sql.NVarChar(20), login).query(sqlQueries.accountByLogin);
        console.log(account)
        return account.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getAccounts,
    getById,
    createAccount,
    updateAccount,
    getByLogin
}