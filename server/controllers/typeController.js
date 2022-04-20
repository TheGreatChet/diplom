const typeData = require('../data/type');

const getTypes = async (req, res, next) => {
    try {
        const list = await statusData.getTypes();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getTypes
} 