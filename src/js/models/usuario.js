import { librosUsuario } from "../listas/listaLibrosUsuario.js";

export class usuario {
  constructor(
    dpi,
    nombre_completo,
    nombre_usuario,
    correo,
    rol,
    contra,
    telefono,
    listaLibros = "[]"
  ) {
    this.dpi = dpi;
    this.nombre_completo = nombre_completo;
    this.nombre_usuario = nombre_usuario;
    this.correo = correo;
    this.rol = rol;
    this.contrasenia = contra;
    this.telefono = telefono;
    this.listaLibros = listaLibros;
  }
}
