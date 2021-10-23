import { Miembro } from './miembro.model';
import { Reunion } from './reunion.model';
import * as mongoose from 'mongoose';

export class AsistenciaMiembroReunion {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public haMarcadoAsistencia: boolean,
    public miembro: Miembro,
    public reunion: Reunion,
    public haAsistido?: boolean,
    public comentarioAdicional?: string
  ) {}
}
