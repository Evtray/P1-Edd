import { usuarios } from "./listas/listaUsuarios.js";
import { usuario } from "./models/usuario.js";

export var listaUsuarios = new usuarios();

var users = JSON.parse(window.localStorage.getItem("users"));

if (users) {
  for (let x of users) {
    var userNew = new usuario(
      x.dpi,
      x.nombre_completo,
      x.nombre_usuario,
      x.correo,
      x.rol,
      x.contrasenia,
      x.telefono
    );
    listaUsuarios.insertar(userNew);
  }
}
listaUsuarios.graficarDerecha();

console.log(listaUsuarios);
