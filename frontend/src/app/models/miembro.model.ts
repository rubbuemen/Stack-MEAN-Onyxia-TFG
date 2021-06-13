import * as mongoose from 'mongoose';

import { CuentaUsuario } from './cuenta-usuario.model';
import { RedSocial } from './red-social.model';
import { SolicitudMiembro } from './solicitud-miembro.model';
import { Buzon } from './buzon.model';
import { InscripcionEvento } from './inscripcion-evento.model';
import { ActividadMiembroTramo } from './actividad-miembro-tramo.model';

export class Miembro {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public apellidos: string,
    public fechaNacimiento: Date,
    public correoElectronico: string,
    public numeroSocio: number,
    public fotografia: any,
    public alias: string,
    public numeroTelefono: number,
    public direccion: string,
    public dni: string,
    public aficiones: string,
    public tieneCochePropio: boolean,
    public rol: string,
    public estaDeAlta: boolean,
    public fechaAlta: Date,
    public cantidadPenalizaciones: number,
    public cuentaUsuario: CuentaUsuario,
    public buzones: Buzon[],
    public solicitudMiembro: SolicitudMiembro,
    public redSocials?: RedSocial[],
    public fechaUltimaPenalizacion?: Date,
    public inscripcionesEvento?: InscripcionEvento[],
    public asociacionesActividadMiembroTramo?: ActividadMiembroTramo[]
  ) {}
}
