const path = require('path');
const express = require('express');
const morgan = require('morgan');
const db = require('./db');
const PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, () =>
  console.log(`Feeling chatty on port ${PORT}`)
);
const io = require('socket.io')(server);
const cors = require('cors');
const seed = require('../seed');

// handle sockets
require('./socket')(io);

module.exports = app;

const corsOptions = {
  origin: 'https://unistackchat.herokuapp.com/',
  optionSuccessStatus: 200,
};

if (process.env.SEED === 'TRUE') {
  seed();
}

db.sync().then(() => console.log('Database is synced'));

// logging middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'node_modules')));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(cors(corsOptions));

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 'API' routes
app.use('/api', require('./api'));

// 404 middleware
app.use((req, res, next) =>
  path.extname(req.path).length > 0 ? res.status(404).send('Not found') : next()
);

// send index.html
app.use('*', (req, res, next) =>
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
);

// error handling endware
app.use((err, req, res, next) =>
  res.status(err.status || 500).send(err.message || 'Internal server error.')
);
