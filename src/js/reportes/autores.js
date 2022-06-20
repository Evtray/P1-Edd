import { autores } from "../listas/listaAutores.js";
import { autor } from "../models/autor.js";
import { abb } from "../arboles/arbolAutores.js";

var arbolAutores = new abb();

var librosStorage = JSON.parse(window.localStorage.getItem("autores"));

if (librosStorage) {
  for (let x of librosStorage) {
    var nuevoAutor = new autor(
      x.dpi,
      x.nombre_autor,
      x.correo,
      x.telefono,
      x.direccion,
      x.biografia
    );
    console.log(nuevoAutor);
    arbolAutores.insertar(nuevoAutor);
  }
}

arbolAutores.generarDot();
