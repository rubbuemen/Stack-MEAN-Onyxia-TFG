const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colores = require('colors');

require('dotenv').config();

const cuentaUsuario = require('./routes/cuentaUsuario');

const app = express();
app.use(express.json());

// Morgan para mostrar información de las peticiones
app.use(
  morgan(function (tokens, req, res) {
    return (
      colores.blue('[' + tokens.method(req, res) + ' ' + colores.blue(tokens.status(req, res)) + ']') +
      ' ' +
      colores.blue(tokens.url(req, res)) +
      ' ' +
      colores.blue(tokens['response-time'](req, res) + ' ms\n')
    );
  })
);

app.use('/', cuentaUsuario);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Escuchando puerto ' + port));

// MongoDB URI building
// const mongoDBUser = process.env.mongoDBUser || 'ruben';
// const mongoDBPass = process.env.mongoDBPass || '1234';
// const mongoDBCredentials = mongoDBUser && mongoDBPass ? mongoDBUser + ':' + mongoDBPass + '@' : '';

const mongoDBHostname = process.env.DB_HOSTNAME || 'localhost';
const mongoDBPort = process.env.DB_PORT || '27017';
const mongoDBName = process.env.DB_NAME || 'Onyxia';

//const mongoDBURI = 'mongodb://' + mongoDBCredentials + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName;
const mongoDBURI = 'mongodb://' + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName;

mongoose
  .connect(mongoDBURI, {
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 20000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('Conectado a MongoDB'))
  .catch((error) => console.log('Ha ocurrido un error al intentar conectarse a MongoDB'));