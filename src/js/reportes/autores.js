import { autor } from "../models/autor.js";
import { autores } from "../listas/listaAutores.js";
import { reporteArbol } from "../arboles/reporteAutores.js";

var reporteAutores = new reporteArbol();

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
    reporteAutores.insertar(nuevoAutor);
  }
}

reporteAutores.generarGrafico();
