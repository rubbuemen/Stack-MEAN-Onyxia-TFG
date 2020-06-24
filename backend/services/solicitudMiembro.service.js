const { errorLanzado } = require('../util/error.util');
const { SolicitudMiembro } = require('../models/solicitudMiembro.model');
const { Visitante } = require('../models/visitante.model');
const { Miembro } = require('../models/miembro.model');

exports.rellenarSolicitudMiembro = async (parametros, usuarioLogeado) => {
  let actorConectado;
  let solicitudMiembro;
  try {
    actorConectado = await Visitante.findOne({ cuentaUsuario: { _id: usuarioLogeado._id } });
    if (actorConectado.solicitudMiembro) throw errorLanzado(403, 'No se puede enviar otra solicitud para ser miembro porque ya tienes una realizada');
    solicitudMiembro = new SolicitudMiembro(parametros);
    solicitudMiembro = await solicitudMiembro.save();
    actorConectado.solicitudMiembro = solicitudMiembro;
    actorConectado = await actorConectado.save();
    return solicitudMiembro;
  } catch (error) {
    if (solicitudMiembro) {
      const checkSolicitudMiembroInActor = await Visitante.findOne({ solicitudMiembro: { _id: solicitudMiembro._id } });
      if (checkSolicitudMiembroInActor) await Visitante.updateOne({ _id: actorConectado._id }, { solicitudMiembro: null });
      await SolicitudMiembro.findByIdAndDelete(solicitudMiembro._id);
    }
    throw error;
  }
};
