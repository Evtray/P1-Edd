import { libros } from "./listas/listaLibros.js";
import { libro } from "./models/libro.js";
import { usuarios } from "./listas/listaUsuarios.js";
import { usuario } from "./models/usuario.js";

export var listaUsuarios = new usuarios();

var users = JSON.parse(window.localStorage.getItem("users"));

if (users) {
  for (let x of users) {
    var listaLibross = JSON.parse(x.listaLibros);
    var listaLibrosUsuario = new libros();

    for (let y of listaLibross) {
      var nuevoLibro = new libro(
        y.isbn,
        y.nombre_autor,
        y.nombre_libro,
        y.cantidad,
        y.fila,
        y.columna,
        y.paginas,
        y.categoria
      );
      listaLibrosUsuario.insertar(nuevoLibro);
    }

    var userNew = new usuario(
      x.dpi,
      x.nombre_completo,
      x.nombre_usuario,
      x.correo,
      x.rol,
      x.contrasenia,
      x.telefono,
      listaLibrosUsuario
    );
    listaUsuarios.insertar(userNew);
  }
}

listaUsuarios.topLibros();
