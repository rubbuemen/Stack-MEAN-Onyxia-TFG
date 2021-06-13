import { Miembro } from './miembro.model';
import { Reunion } from './reunion.model';

export class AsistenciaMiembroReunion {
  constructor(
    public haMarcadoAsistencia: boolean,
    public miembro: Miembro,
    public reunion: Reunion,
    public haAsistido?: boolean,
    public comentarioAdicional?: string
  ) {}
}
