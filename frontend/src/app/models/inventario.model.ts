import * as mongoose from 'mongoose';

export class Inventario {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public estadoMaterial: string,
    public esPropio: boolean,
    public enUso: boolean
  ) {}
}
