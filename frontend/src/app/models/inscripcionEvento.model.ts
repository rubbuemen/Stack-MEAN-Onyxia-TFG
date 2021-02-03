import { Miembro } from './miembro.model';
import { Actividad } from './actividad.model';
import { Evento } from './evento.model';

export class InscripcionEvento {
  constructor(
    public estadoInscripcion: string,
    public tieneCocheDisponible: any,
    public miembro: Miembro,
    public evento: Evento,
    public problemaAlimenticio?: string,
    public comentarioAdicional?: string,
    public actividadesInteres?: Actividad[]
  ) {}
}
