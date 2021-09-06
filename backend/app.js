const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const colores = require('colors');
const { comprobarFechaPenalizacion, reiniciarCuotaMiembros } = require('./services/miembro.service');
const { eliminarSolicitudesMiembroRechazadas } = require('./services/solicitudMiembro.service');
const { cambiarEventosAEnProgreso, cambiarEventosARealizados } = require('./services/evento.service');
const { cambiarReunionesAEnProgreso, cambiarReunionesARealizado } = require('./services/reunion.service');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.disable('etag');

// Morgan para mostrar información de las peticiones
app.use(
  morgan((tokens, req, res) => {
    return (
      colores.blue('[' + tokens.method(req, res) + ' ' + colores.blue(tokens.status(req, res)) + ']') +
      ' ' +
      colores.blue(tokens.url(req, res)) +
      ' ' +
      colores.blue(tokens['response-time'](req, res) + ' ms\n')
    );
  })
);

// Rutas
app.use('/', require('./routes/cuentaUsuario.route'));
app.use('/redSocial', require('./routes/redSocial.route'));
app.use('/actor', require('./routes/actor.route'));
app.use('/miembro', require('./routes/miembro.route'));
app.use('/solicitudMiembro', require('./routes/solicitudMiembro.route'));
app.use('/actividad', require('./routes/actividad.route'));
app.use('/material', require('./routes/material.route'));
app.use('/inventario', require('./routes/inventario.route'));
app.use('/evento', require('./routes/evento.route'));
app.use('/diaEvento', require('./routes/diaEvento.route'));
app.use('/tramoHorario', require('./routes/tramoHorario.route'));
app.use('/inscripcionEvento', require('./routes/inscripcionEvento.route'));
app.use('/actividadMiembroTramo', require('./routes/actividadMiembroTramo.route'));
app.use('/reunion', require('./routes/reunion.route'));
app.use('/asistenciaMiembroReunion', require('./routes/asistenciaMiembroReunion.route'));
app.use('/albumFotografia', require('./routes/albumFotografia.route'));
app.use('/fotografia', require('./routes/fotografia.route'));
app.use('/noticia', require('./routes/noticia.route'));
app.use('/buzon', require('./routes/buzon.route'));
app.use('/notificacion', require('./routes/notificacion.route'));
app.use('/configuracion', require('./routes/configuracion.route'));
app.use('/banner', require('./routes/banner.route'));

//Comprobar penalizaciones miembros
comprobarFechaPenalizacion();

//Reiniciar cuotas miembros
reiniciarCuotaMiembros();

//Eliminar solicitudes de miembros rechazadas
eliminarSolicitudesMiembroRechazadas();

//Eventos
cambiarEventosAEnProgreso();
cambiarEventosARealizados();

//Reuniones
cambiarReunionesAEnProgreso();
cambiarReunionesARealizado();

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
  .catch(error => console.log('Ha ocurrido un error al intentar conectarse a MongoDB'));

exports.dropdb = async () => mongoose.connection.db.dropDatabase();
exports.seedersList = {};
