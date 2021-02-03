import { TramoHorario } from './tramoHorario.model';

export class DiaEvento {
  constructor(public fecha: Date, public tramosHorarios: TramoHorario[]) {}
}
