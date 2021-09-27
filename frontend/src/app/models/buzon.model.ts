import { Notificacion } from './notificacion.model';
import * as mongoose from 'mongoose';

export class Buzon {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public esPorDefecto: boolean,
    public notificaciones?: Notificacion[]
  ) {}
}
