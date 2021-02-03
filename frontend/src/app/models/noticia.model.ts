import { Miembro } from './miembro.model';

export class Noticia {
  constructor(
    public titulo: string,
    public cuerpo: string,
    public fechaPublicacion: Date,
    public miembroCreador: Miembro,
    public imagen?: any
  ) {}
}
