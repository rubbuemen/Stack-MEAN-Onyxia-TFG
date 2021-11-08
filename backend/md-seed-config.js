const mongoose = require('mongoose');

const { Actividades } = require('./seeders/actividad.seeder');
const { ActividadesMiembroTramo } = require('./seeders/actividadMiembroTramo.seeder');
const { AlbumFotografias } = require('./seeders/albumFotografia.seeder');
const { AsistenciaMiembroReuniones } = require('./seeders/asistenciaMiembroReunion.seeder');
const { Banners } = require('./seeders/banner.seeder');
const { Configuracion } = require('./seeders/configuracion.seeder');
const { CuentasUsuarios } = require('./seeders/cuentaUsuario.seeder');
const { DiaEventos } = require('./seeders/diaEvento.seeder');
const { Eventos } = require('./seeders/evento.seeder');
const { Fotografias } = require('./seeders/fotografia.seeder');
const { InscripcionesEvento } = require('./seeders/inscripcionEvento.seeder');
const { Inventarios } = require('./seeders/inventario.seeder');
const { Materiales } = require('./seeders/material.seeder');
const { Miembros } = require('./seeders/miembro.seeder');
const { Noticias } = require('./seeders/noticia.seeder');
const { Notificaciones } = require('./seeders/notificacion.seeder');
const { RedesSociales } = require('./seeders/redSocial.seeder');
const { Reuniones } = require('./seeders/reunion.seeder');
const { SolicitudesMiembros } = require('./seeders/solicitudMiembro.seeder');
const { TramosHorarios } = require('./seeders/tramoHorario.seeder');
const { Visitantes } = require('./seeders/visitante.seeder');

const mongoDBHostname = process.env.DB_HOSTNAME || 'localhost';
const mongoDBPort = process.env.DB_PORT || '27017';
const mongoDBName = process.env.DB_NAME || 'Onyxia';

const mongoDBURI = 'mongodb://' + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName;

module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports.connect = async () =>
  await mongoose.connect(mongoDBURI, {
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 200000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

module.exports.seedersList = {
  Actividades,
  ActividadesMiembroTramo,
  AlbumFotografias,
  AsistenciaMiembroReuniones,
  Banners,
  Configuracion,
  CuentasUsuarios,
  DiaEventos,
  Eventos,
  Fotografias,
  InscripcionesEvento,
  Inventarios,
  Materiales,
  Miembros,
  Noticias,
  Notificaciones,
  RedesSociales,
  Reuniones,
  SolicitudesMiembros,
  TramosHorarios,
  Visitantes,
};

//md-seed run --dropdb
