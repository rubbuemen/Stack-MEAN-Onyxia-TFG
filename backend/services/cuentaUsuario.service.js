const { errorLanzado } = require('../util/error.util');
const { CuentaUsuario } = require('../models/cuentaUsuario.model');
const { RedSocial } = require('../models/redSocial.model');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');
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
    visitante = new Visitante(parametros);
    visitante.cuentaUsuario = cuentaUsuario;
    if (redSocial) visitante.redSocials.push(redSocial);
    visitante = await visitante.save();
    return visitante;
  } catch (error) {
    if (cuentaUsuario) await CuentaUsuario.findByIdAndDelete(cuentaUsuario._id);
    if (redSocial) {
      const checkRedSocialInVisitante = await Visitante.findOne({ redSocials: { $in: [redSocial._id] } });
      if (checkRedSocialInVisitante) await Visitante.updateOne({ _id: visitante._id }, { $pull: { redSocials: redSocial._id } });
      await RedSocial.findByIdAndDelete(redSocial._id);
    }
    throw error;
  }
};

exports.checkEstadoUsuario = async (usuarioLogeado) => {
  const cuentaUsuario = await CuentaUsuario.findOne({ usuario: usuarioLogeado.usuario });
  if (!cuentaUsuario.estado) throw errorLanzado(403, 'Usted ha sido baneado y por tanto no puede realizar ninguna acción');
};
