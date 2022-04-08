const express = require('express');
const cfg = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);

app.listen(cfg.port, () => console.log('Server listening on port ' + cfg.port));