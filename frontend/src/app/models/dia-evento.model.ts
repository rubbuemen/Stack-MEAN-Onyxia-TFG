import { TramoHorario } from './tramo-horario.model';

export class DiaEvento {
  constructor(public fecha: Date, public tramosHorarios: TramoHorario[]) {}
}
