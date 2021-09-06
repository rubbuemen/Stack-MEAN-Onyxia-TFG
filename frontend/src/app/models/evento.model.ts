import { Miembro } from './miembro.model';
import { DiaEvento } from './dia-evento.model';
import { Actividad } from './actividad.model';
import { InscripcionEvento } from './inscripcion-evento.model';
import { Inventario } from './inventario.model';
import * as mongoose from 'mongoose';

export class Evento {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public descripcion: string,
    public lugar: string,
    public cupoInscripciones: number,
    public estadoEvento: string,
    public estaPublicado: boolean,
    public esFueraSevilla: boolean,
    public miembroCreador: Miembro,
    public diasEvento: DiaEvento[],
    public actividadesEvento: Actividad[],
    public imagen?: any,
    public inscripcionesEvento?: InscripcionEvento[],
    public inventarios?: Inventario[]
  ) {}
}
