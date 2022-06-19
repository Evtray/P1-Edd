import { usuarios } from "./listas/listaUsuarios.js";
import { libros } from "./listas/listaLibros.js";
import { autores } from "./listas/listaAutores.js";

import { usuario } from "./models/usuario.js";
import { libro } from "./models/libro.js";
import { autor } from "./models/autor.js";

document.getElementById("btn-users").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    loadFile("usuarios");
  },
  false
);

document.getElementById("btn-libros").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    loadFile("libros");
  },
  false
);

document.getElementById("btn-autores").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    loadFile("autores");
  },
  false
);

export var listaUsuarios = new usuarios();

var listaLibros = new libros();
var listaAutores = new autores();

var types;
function loadFile(type) {
  types = type;
  var input, file, fr;
  input = document.getElementById(`files-${type}`);
  console.log(type)
  if (!input) {
    alert("No hay documento");
  } else if (!input.files) {
    alert("Tu navegador no sirve");
  } else if (!input.files[0]) {
    alert("Selecciona algun archivo");
  } else {
    file = input.files[0];
    fr = new FileReader();
    fr.onload = recibirArchivo;
    fr.readAsText(file);
  }
}

function recibirArchivo(archivo) {
  let lineas = archivo.target.result;

  var lista = JSON.parse(lineas);
  switch (types) {
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

function crearLibros(archivo) {
  for (let x of archivo) {
    var nuevoLibro = new libro(
      x.isbn,
      x.nombre_autor,
      x.nombre_libro,
      x.cantidad,
      x.fila,
      x.columna,
      x.paginas,
      x.categoria
    );
    listaLibros.insertar(nuevoLibro);
  }
  listaLibros.recorrer();
}

function crearAutores(archivo) {
  for (let x of archivo) {
    var nuevoAutor = new autor(
      x.dpi,
      x.nombre_autor,
      x.correo,
      x.telefono,
      x.direccion,
      x.biografia,
    );
    listaAutores.insertar(nuevoAutor);
  }
  listaAutores.recorrer();
}

