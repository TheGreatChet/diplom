const accountData = require('../data/account');

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

module.exports = {
    getAccounts,
    getById,
    addAccount,
    updateAccount
}