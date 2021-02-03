import { Miembro } from './miembro.model';
import { Inventario } from './inventario.model';

export class Material {
  constructor(
    public nombre: string,
    public descripcion: string,
    public fotografia: any,
    public cantidadDisponible: number,
    public cantidadEnUso: number,
    public miembroCreador: Miembro,
    public inventarios?: Inventario[]
  ) {}
}
