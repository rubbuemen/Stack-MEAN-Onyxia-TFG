import { Visitante } from './visitante.model';
import { Miembro } from './miembro.model';

export class Notificacion {
  constructor(
    public asunto: string,
    public cuerpo: string,
    public fecha: Date,
    public receptoresVisitantes?: Visitante[],
    public receptoresMiembros?: Miembro[],
    public emisorVisitante?: Visitante,
    public emisorMiembro?: Miembro
  ) {}
}
