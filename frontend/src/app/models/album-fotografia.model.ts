import { Evento } from './evento.model';
import { Fotografia } from './fotografia.model';
import * as mongoose from 'mongoose';

export class AlbumFotografia {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public evento: Evento,
    public fotografias?: Fotografia[]
  ) {}
}
