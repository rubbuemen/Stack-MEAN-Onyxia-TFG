import { Miembro } from './miembro.model';
import { Material } from './material.model';
import { ActividadMiembroTramo } from './actividad-miembro-tramo.model';
import * as mongoose from 'mongoose';

export class Actividad {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
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
