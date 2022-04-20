const carData = require('../data/account');

const getCars = async (req, res, next) => {
    try {
        const cars = await carData.getCars();
        res.send(cars);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getById = async (req, res, next) => {
    try {
        const carId = req.params.id;
        const car = await carData.getById(carId);
        res.send(account);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getCars,
    getById,
}