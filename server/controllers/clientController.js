const clientData = require('../data/client');

const getClients = async (req, res, next) => {
    try {
        const clients = await clientData.getClients();
        res.send(clients);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const accountId = req.params.id;
        const client = await clientData.getById(accountId);
        res.send(client);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addClient = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await clientData.createClient(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateClient = async (req, res, next) => {
    try {
        const clientId = req.params.id;
        const data = req.body;
        const updated = await clientData.updateClient(clientId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getClients,
    getById,
    addClient,
    updateClient
}