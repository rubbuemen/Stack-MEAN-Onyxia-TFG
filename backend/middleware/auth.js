const jwt = require('jsonwebtoken');
const errorLanzado = require('../util/error.util');
const colores = require('colors');

const permisos = (req, res, next, roles) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    const payload = jwt.verify(token, process.env.SECRET_KEY); // Comparamos el token actual con la palabra secreta
    if (!token) throw errorLanzado(401, 'Acceso Denegado. No existe ningún token');
    if (!roles.includes(payload.autoridad)) throw errorLanzado(403, 'El rol del usuario no está permitido');
    req.cuentaUsuario = payload;
    next();
  } catch (error) {
    if (error.status && error.message) {
      console.error(colores.red('[Error ' + error.status + ']'));
      console.error(colores.red(error.stack));
      return res.status(error.status).send({ error: error.message });
    } else {
      console.log(colores.red(error));
      return res.status(401).send({ error: 'Acceso denegado. Token inválido' });
    }
  }
};

// Exportación de roles individuales
exports.visitante = (req, res, next) => permisos(req, res, next, ['VISITANTE']);
exports.miembro = (req, res, next) => permisos(req, res, next, ['MIEMBRO']);
exports.vocal = (req, res, next) => permisos(req, res, next, ['VOCAL']);
exports.secretario = (req, res, next) => permisos(req, res, next, ['SECRETARIO']);
exports.vicepresidente = (req, res, next) => permisos(req, res, next, ['VICEPRESIDENTE']);
exports.presidente = (req, res, next) => permisos(req, res, next, ['PRESIDENTE']);

// Actor registrado
exports.actor_registrado = (req, res, next) => permisos(req, res, next, ['VISITANTE', 'MIEMBRO', 'VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE']);

// Junta directiva
exports.junta_directiva = (req, res, next) => permisos(req, res, next, ['MIEMBRO', 'VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE']);

// Secretario y presidente
exports.secretario_presidente = (req, res, next) => permisos(req, res, next, ['SECRETARIO', 'PRESIDENTE']);

// Vicepresidente y presidente
exports.vicepresidente_presidente = (req, res, next) => permisos(req, res, next, ['VICEPRESIDENTE', 'PRESIDENTE']);

// Secretario, vicepresidente y presidente
exports.junta_superior = (req, res, next) => permisos(req, res, next, ['SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE']);
