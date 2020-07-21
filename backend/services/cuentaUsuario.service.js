const { errorLanzado } = require('../util/error.util');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const { RedSocial } = require('../models/redSocial.model');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');
const { Buzon } = require('../models/buzon.model');
const bcrypt = require('bcryptjs');

exports.getUsuarioLogeado = async (usuario) => {
  const cuentaUsuario = await CuentaUsuario.findOne({ usuario: usuario });
  if (!cuentaUsuario) throw errorLanzado(404, 'El usuario introducido no existe');
  if (!cuentaUsuario.estado) throw errorLanzado(403, 'El usuario introducido está baneado');
  return cuentaUsuario;
};

exports.registrarse = async (parametros) => {
  let cuentaUsuario;
  let redSocial;
  let visitante;
  let buzonEntrada;
  let buzonSalida;
  let buzonEliminados;
  try {
    const checkUsuario = await CuentaUsuario.findOne({ usuario: parametros.usuario });
    if (checkUsuario) throw errorLanzado(403, 'El usuario introducido ya existe');
    const checkEmail =
      (await Visitante.findOne({ correoElectronico: parametros.correoElectronico })) ||
      (await Miembro.findOne({ correoElectronico: parametros.correoElectronico }));
    if (checkEmail) throw errorLanzado(403, 'El correo electrónico introducido ya existe');
    if (parametros.numeroTelefono) {
      const checkTelefono =
        (await Visitante.findOne({ numeroTelefono: parametros.numeroTelefono })) || (await Miembro.findOne({ numeroTelefono: parametros.numeroTelefono }));
      if (checkTelefono) throw errorLanzado(403, 'El número de teléfono introducido ya existe');
    }
    cuentaUsuario = new CuentaUsuario({
      usuario: parametros.usuario,
      contraseña: bcrypt.hashSync(parametros.contraseña, 8), // 8 significa aproximadamente 40 hashes/seg
      autoridad: 'VISITANTE',
    });
    cuentaUsuario = await cuentaUsuario.save();
    if (parametros.nombreRedSocial) {
      redSocial = new RedSocial({
        nombre: parametros.nombreRedSocial,
        enlace: parametros.enlaceRedSocial,
        usuario: parametros.usuarioRedSocial,
      });
      redSocial = await redSocial.save();
    }
    parametros.fechaNacimiento = new Date(parametros.fechaNacimiento);
    buzonEntrada = new Buzon({ nombre: 'Buzón de entrada', esPorDefecto: true });
    buzonEntrada = await buzonEntrada.save();
    buzonSalida = new Buzon({ nombre: 'Buzón de salida', esPorDefecto: true });
    buzonSalida = await buzonSalida.save();
    buzonEliminados = new Buzon({ nombre: 'Buzón de eliminados', esPorDefecto: true });
    buzonEliminados = await buzonEliminados.save();
    visitante = new Visitante(parametros);
    visitante.cuentaUsuario = cuentaUsuario;
    if (redSocial) visitante.redSocials.push(redSocial);
    visitante.buzones.push(buzonEntrada);
    visitante.buzones.push(buzonSalida);
    visitante.buzones.push(buzonEliminados);
    visitante = await visitante.save();
    return visitante;
  } catch (error) {
    if (cuentaUsuario) await CuentaUsuario.findByIdAndDelete(cuentaUsuario._id);
    if (redSocial) {
      const checkRedSocialInVisitante = await Visitante.findOne({ redSocials: { $in: [redSocial._id] } });
      if (checkRedSocialInVisitante) await Visitante.updateOne({ _id: visitante._id }, { $pull: { redSocials: redSocial._id } });
      await RedSocial.findByIdAndDelete(redSocial._id);
    }
    if (buzonEntrada) {
      const checkBuzonEntradaInVisitante = await Visitante.findOne({ buzones: { $in: [buzonEntrada._id] } });
      if (checkBuzonEntradaInVisitante) await Visitante.updateOne({ _id: visitante._id }, { $pull: { buzones: buzonEntrada._id } });
      await Buzon.findByIdAndDelete(buzonEntrada._id);
    }
    if (buzonSalida) {
      const checkBuzonSalidaInVisitante = await Visitante.findOne({ buzones: { $in: [buzonSalida._id] } });
      if (checkBuzonSalidaInVisitante) await Visitante.updateOne({ _id: visitante._id }, { $pull: { buzones: buzonSalida._id } });
      await Buzon.findByIdAndDelete(buzonSalida._id);
    }
    if (buzonEliminados) {
      const checkBuzonEliminadosInVisitante = await Visitante.findOne({ buzones: { $in: [buzonEliminados._id] } });
      if (checkBuzonEliminadosInVisitante) await Visitante.updateOne({ _id: visitante._id }, { $pull: { buzones: buzonEliminados._id } });
      await Buzon.findByIdAndDelete(buzonEliminados._id);
    }
    throw error;
  }
};

exports.checkEstadoUsuario = async (usuarioLogeado) => {
  const cuentaUsuario = await CuentaUsuario.findOne({ usuario: usuarioLogeado.usuario });
  if (!cuentaUsuario.estado) throw errorLanzado(403, 'Usted ha sido baneado y por tanto no puede realizar ninguna acción');
};

exports.banearCuenta = async (userId) => {
  const checkExistencia = await CuentaUsuario.findById(userId);
  if (!checkExistencia) throw errorLanzado(404, 'La cuenta de usuario que intenta banear no existe');
  if (!checkExistencia.estado) throw errorLanzado(403, 'No puede banear al usuario porque ya lo está');
  const cuentaUsuario = await CuentaUsuario.findOneAndUpdate(
    { _id: userId },
    {
      estado: false,
    },
    { new: true }
  );
  return cuentaUsuario;
};

exports.desbanearCuenta = async (userId) => {
  const checkExistencia = await CuentaUsuario.findById(userId);
  if (!checkExistencia) throw errorLanzado(404, 'La cuenta de usuario que intenta desbanear no existe');
  if (checkExistencia.estado) throw errorLanzado(403, 'No puede desbanear al usuario porque ya lo está');
  const cuentaUsuario = await CuentaUsuario.findOneAndUpdate(
    { _id: userId },
    {
      estado: true,
    },
    { new: true }
  );
  return cuentaUsuario;
};
