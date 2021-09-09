export interface RegistroForm {
  nombre: string;
  apellidos: string;
  correoElectronico: string;
  fechaNacimiento: Date;
  usuario: string;
  contraseña: string;
  numeroTelefono?: string;
  alias?: string;
  nombreRedSocial?: string;
  enlaceRedSocial?: string;
  usuarioRedSocial?: string;
}
