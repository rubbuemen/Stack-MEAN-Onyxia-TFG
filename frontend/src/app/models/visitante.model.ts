import { CuentaUsuario } from './cuentaUsuario.model';
import { RedSocial } from './redSocial.model';
import { SolicitudMiembro } from './solicitudMiembro.model';
import { Buzon } from './buzon.model';

export class Visitante {
  constructor(
    public nombre: string,
    public apellidos: string,
    public fechaNacimiento: Date,
    public correoElectronico: string,
    public numeroTelefono: number,
    public cuentaUsuario: CuentaUsuario,
    public fechaCreacion: Date,
    public buzones: Buzon[],
    public alias?: string,
    public redSocials?: RedSocial[],
    public solicitudMiembro?: SolicitudMiembro
  ) {}
}
