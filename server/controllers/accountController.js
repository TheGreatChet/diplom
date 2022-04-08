const accountData = require('../data/accounts');

const getAccounts = async (req, res, next) => {
    try {
        const accounts = await accountData.getAccounts();
        res.send(accounts);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAccounts
}