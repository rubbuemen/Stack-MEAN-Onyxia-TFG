import * as mongoose from 'mongoose';

export class CuentaUsuario {
  constructor(
    public _id: mongoose.Schema.Types.ObjectId,
    public usuario: string,
    public contraseña: string,
    public autoridad: string,
    public estado: boolean,
    public fechaCreacion: Date
  ) {}
}
