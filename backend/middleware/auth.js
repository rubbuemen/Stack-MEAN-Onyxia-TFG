const jwt = require('jsonwebtoken');
const { errorLanzado, controlError } = require('../util/error.util');
const { checkEstadoUsuario } = require('../services/cuentaUsuario.service');

const permisos = async (req, res, next, roles) => {
  try {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (!token) throw errorLanzado(401, 'Acceso Denegado. No existe ningún token');
    const payload = await jwt.verify(token, process.env.SECRET_KEY); // Comparamos el token actual con la palabra secreta
    if (!roles.includes(payload.autoridad)) throw errorLanzado(403, 'El rol del usuario no está permitido');
    req.cuentaUsuario = payload;
    await checkEstadoUsuario(req.cuentaUsuario);
    next();
  } catch (error) {
    return controlError(error, res);
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

// Miembro de la asociación
exports.aso_miembro = (req, res, next) => permisos(req, res, next, ['MIEMBRO', 'VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE']);

// Junta directiva
exports.junta_directiva = (req, res, next) => permisos(req, res, next, ['VOCAL', 'SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE']);

// Secretario y presidente
exports.secretario_presidente = (req, res, next) => permisos(req, res, next, ['SECRETARIO', 'PRESIDENTE']);

// Vicepresidente y presidente
exports.vicepresidente_presidente = (req, res, next) => permisos(req, res, next, ['VICEPRESIDENTE', 'PRESIDENTE']);

// Secretario, vicepresidente y presidente
exports.junta_superior = (req, res, next) => permisos(req, res, next, ['SECRETARIO', 'VICEPRESIDENTE', 'PRESIDENTE']);
