const modelData = require('../data/model');

const getModels = async (req, res, next) => {
    try {
        const list = await modelData.getModels();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getModels
} 