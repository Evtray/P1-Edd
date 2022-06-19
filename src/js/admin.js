import { listaUsuario } from "./listas/listaUsuario";
import { listaLibros } from "./listas/listaLibros";
import { listaAutores } from "./listas/listaAutores";

import { usuario } from "./models/usuario.js";
import { autor } from "./autor.js";
import { libro } from "./libro.js";

function loadFile(type) {
  var input, file, fr;

  input = document.getElementById("files");

  if (input) {
    if (input.files.length > 0) {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = recibirArchivo;
    }
  }
}

function recibirArchivo(archivo, type) {
  let lineas = archivo.target.result;
  var lista = JSON.parse(lineas);
  switch (type) {
    case "usuarios":
      crearUsuarios(lista);
      break;
    case "autores":
      crearAutores(lista);
    case "libros":
      crearLibros(lista);
      break;
    default:
      break;
  }
}

function crearUsuarios(archivo) {
  for (let x of archivo) {
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
  listaUsuarios.recorrer();
}
