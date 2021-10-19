import { Miembro } from './miembro.model';
import { Inventario } from './inventario.model';

import * as mongoose from 'mongoose';

export class Material {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public descripcion: string,
    public fotografia: any,
    public cantidadDisponible: number,
    public cantidadEnUso: number,
    public miembroCreador: Miembro,
    public inventarios?: Inventario[]
  ) {}
}
