const statusData = require('../data/status');

const getStatuses = async (req, res, next) => {
    try {
        const list = await statusData.getStatuses();
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getStatuses
} 