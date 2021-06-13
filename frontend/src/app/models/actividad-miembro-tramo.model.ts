import { Actividad } from './actividad.model';
import { Miembro } from './miembro.model';
import { TramoHorario } from './tramo-horario.model';

export class ActividadMiembroTramo {
  constructor(
    public actividad: Actividad,
    public miembro: Miembro,
    public tramoHorario: TramoHorario
  ) {}
}
