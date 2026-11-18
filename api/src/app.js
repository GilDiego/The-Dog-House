const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const { clientOrigin } = require('./config');

const app = express();

app.use(cors({ origin: clientOrigin, credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

app.use('/', routes);

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
