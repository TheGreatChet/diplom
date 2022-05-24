const accountData = require('../data/account');
const jwt = require('jsonwebtoken')
const {SECRET} = process.env;

const getAccounts = async (req, res, next) => {
    try {
        const accounts = await accountData.getAccounts();
        res.send(accounts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const accountId = req.params.id;
        const account = await accountData.getById(accountId);
        res.send(account);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getByLogin = async (req, res, next) => {
    try {
        const login = req.params.login;
        const account = await accountData.getByLogin(login);
        res.send(account);
    } catch (error) {
        console.log(error.message)
    }
}

const addAccount = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await accountData.createAccount(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateAccount = async (req, res, next) => {
    try {
        const accountId = req.params.id;
        const data = req.body;
        const updated = await accountData.updateAccount(accountId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, SECRET, {expiresIn: "24h"})
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await accountData.getByLogin(username);
        if (!user[0]) {
            return res.status(400).json({message: 'Пользователь с таким логином не найден'})
        }
        if (user[0]['Password'] != password) {
            return res.status(400).json({message: 'Неправильный пароль'})
        }
        
        const token = generateAccessToken(user[0]['AccountId'], user[0]['RoleId'])
        res.json({token: token, roleId: user[0]['RoleId']});
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAccounts,
    getById,
    addAccount,
    updateAccount,
    getByLogin,
    login
}