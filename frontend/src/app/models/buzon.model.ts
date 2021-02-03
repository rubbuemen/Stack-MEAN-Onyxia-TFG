import { Notificacion } from './notificacion.model';

export class Buzon {
  constructor(
    public nombre: string,
    public esPorDefecto: boolean,
    public notificaciones?: Notificacion[]
  ) {}
}
