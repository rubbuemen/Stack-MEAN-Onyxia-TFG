import { Miembro } from './miembro.model';
import { Material } from './material.model';
import { ActividadMiembroTramo } from './actividadMiembroTramo.model';

export class Actividad {
  constructor(
    public nombre: string,
    public descripcion: string,
    public fotografia: any,
    public reglas: string,
    public estaPublicado: boolean,
    public fechaPublicacion: Date,
    public enVigor: boolean,
    public miembroCreador: Miembro,
    public materiales: Material[],
    public asociacionesActividadMiembroTramo?: ActividadMiembroTramo[]
  ) {}
}
