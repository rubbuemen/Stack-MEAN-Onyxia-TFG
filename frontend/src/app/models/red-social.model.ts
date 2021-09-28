import * as mongoose from 'mongoose';

export class RedSocial {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public nombre: string,
    public enlace: string,
    public usuario: string
  ) {}
}
