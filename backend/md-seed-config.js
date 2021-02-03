const mongoose = require('mongoose');

const { RedesSociales } = require('./seeders/redSocial.seeder');
const { Miembros } = require('./seeders/miembro.seeder');
const { Buzones } = require('./seeders/buzon.seeder');
const { SolicitudesMiembros } = require('./seeders/solicitudMiembro.seeder');
const { CuentasUsuarios } = require('./seeders/cuentaUsuario.seeder');
const { Configuracion } = require('./seeders/configuracion.seeder');

const mongoDBHostname = process.env.DB_HOSTNAME || 'localhost';
const mongoDBPort = process.env.DB_PORT || '27017';
const mongoDBName = process.env.DB_NAME || 'Onyxia';

const mongoDBURI = 'mongodb://' + mongoDBHostname + ':' + mongoDBPort + '/' + mongoDBName;

module.exports.dropdb = async () => mongoose.connection.db.dropDatabase();

module.exports.connect = async () =>
  await mongoose.connect(mongoDBURI, {
    poolSize: 10, // Up to 10 sockets
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 20000, // Close sockets after 45 seconds of inactivity
    family: 4, // skip trying IPv6
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

module.exports.seedersList = { CuentasUsuarios, RedesSociales, Buzones, SolicitudesMiembros, Miembros, Configuracion };

//md-seed run --dropdb
