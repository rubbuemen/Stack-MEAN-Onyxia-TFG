import { Evento } from './evento.model';
import { Fotografia } from './fotografia.model';

export class AlbumFotografia {
  constructor(
    public nombre: string,
    public evento: Evento,
    public fotografias?: Fotografia[]
  ) {}
}
