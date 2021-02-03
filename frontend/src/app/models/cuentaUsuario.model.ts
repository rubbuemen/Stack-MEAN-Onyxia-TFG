export class CuentaUsuario {
  constructor(
    public usuario: string,
    public contraseña: string,
    public autoridad: string,
    public estado: boolean,
    public fechaCreacion: Date
  ) {}
}
