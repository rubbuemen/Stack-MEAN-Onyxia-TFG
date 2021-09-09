import { Miembro } from './miembro.model';
import * as mongoose from 'mongoose';

export class Noticia {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public titulo: string,
    public cuerpo: string,
    public fechaPublicacion: Date,
    public miembroCreador: Miembro,
    public imagen?: any
  ) {}
}
