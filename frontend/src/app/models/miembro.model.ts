import { CuentaUsuario } from './cuentaUsuario.model';
import { RedSocial } from './redSocial.model';
import { SolicitudMiembro } from './solicitudMiembro.model';
import { Buzon } from './buzon.model';
import { InscripcionEvento } from './inscripcionEvento.model';
import { ActividadMiembroTramo } from './actividadMiembroTramo.model';

export class Miembro {
  constructor(
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
