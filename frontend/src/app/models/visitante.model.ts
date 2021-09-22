import * as mongoose from 'mongoose';

import { CuentaUsuario } from './cuenta-usuario.model';
import { RedSocial } from './red-social.model';
import { SolicitudMiembro } from './solicitud-miembro.model';
import { Buzon } from './buzon.model';

export class Visitante {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public apellidos: string,
    public fechaNacimiento: Date,
    public correoElectronico: string,
    public cuentaUsuario: CuentaUsuario,
    public fechaCreacion: Date,
    public buzones: Buzon[],
    public numeroTelefono?: number,
    public alias?: string,
    public redSocials?: RedSocial[],
    public solicitudMiembro?: SolicitudMiembro
  ) {}
}
