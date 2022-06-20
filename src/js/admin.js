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

document.getElementById("btn-logout").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    logout();
  },
  false
);

function logout() {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
}

var user = JSON.parse(window.localStorage.getItem("user"));

var labelUsuario = document.getElementById("label-usuario");
labelUsuario.innerText = user.nombre_completo;

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
var listaCola = new autores();

var listaCola = new libros();

var librosStorage = JSON.parse(window.localStorage.getItem("cola"));

if (librosStorage) {
  for (let x of librosStorage) {
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
    listaCola.insertar(nuevoLibro);
  }
}

var types;
function loadFile(type) {
  console.log();
  types = type;
  var input, file, fr;
  input = document.getElementById(`files-${type}`);
  console.log(type);
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
  alert("Archivo subido!");
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
      x.biografia
    );
    listaAutores.insertar(nuevoAutor);
  }
  listaAutores.recorrer();
}

var actual = listaCola.cabeza;
var stringLibros = "";
var contentLibros = document.getElementById("content-libros");

for (let index = 0; index < listaCola.contador; index++) {
  actual = actual.siguiente;

  stringLibros += `
    <div class="shadow cursor-pointer rounded-md overflow-hidden h-60 w-60 my-4">
    <div class=" bg-gray-50">
        <img class="h-36 w-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="">
    </div>
    <div class="p-2">
        <h1>${actual.libro.nombre_libro}</h1>
        <span class="text-sm text-gray-600">Autor: ${actual.libro.nombre_autor}</span><br>
        <span class="text-gray-600">Cantidad: ${actual.libro.cantidad}</span>
        <div class="pt-2">
        </div>
    </div>
    </div>
  `;
}
contentLibros.innerHTML = stringLibros;
