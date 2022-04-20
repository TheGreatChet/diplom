const emplData = require('../data/client');

const getEmpl = async (req, res, next) => {
    try {
        const employee = await emplData.getEmployee();
        res.send(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const emplId = req.params.id;
        const employee = await emplData.getById(emplId);
        res.send(employee);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addEmpl = async (req, res, next) => {
    try {
        const data = req.body;
        const created = await emplData.createEmployee(data);
        res.send(created);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateEmpl = async (req, res, next) => {
    try {
        const emplId = req.params.id;
        const data = req.body;
        const updated = await emplData.updateEmployee(emplId, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getEmpl,
    getById,
    addEmpl,
    updateEmpl
}