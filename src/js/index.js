import { listaCircular } from "./listas/listaUsuarios.js";

import { usuario } from "./models/usuario.js";

export var listaUsuarios = new listaCircular();

var users = JSON.parse(window.localStorage.getItem("users"));

if (users) {
  for (let x of users) {
    var userNew = new usuario(
      x.dpi,
      x.nombre,
      x.usuario,
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
