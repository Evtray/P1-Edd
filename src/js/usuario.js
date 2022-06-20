import { libros } from "./listas/listaLibros.js";
import { libro } from "./models/libro.js";

import { librosUsuario } from "./listas/listaLibrosUsuario.js";

document.getElementById("btn-logout").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    logout();
  },
  false
);
document.getElementById("btn-descendente").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    listaLibros.ordenarInAlfa();
    getLibros();
  },
  false
);
document.getElementById("btn-ascendente").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    listaLibros.ordenarAlfa();
    getLibros();
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

var listaLibros = new libros();
var listaLibrosUsuario = new libros();

var librosStorage = JSON.parse(window.localStorage.getItem("libros"));

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
    listaLibros.insertar(nuevoLibro);
  }
}

var librosStorage = JSON.parse(window.localStorage.getItem("user-libros"));

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
    listaLibrosUsuario.insertar(nuevoLibro);
  }
}

function getLibros() {
  var actual = listaLibros.cabeza;
  var stringLibros = "";
  var contentLibros = document.getElementById("content-libros");

  for (let index = 0; index < listaLibros.contador; index++) {
    actual = actual.siguiente;

    stringLibros += `
    <div class="shadow cursor-pointer rounded-md overflow-hidden h-64 w-60 my-4">
    <div class=" bg-gray-50">
        <img class="h-36 w-full"
            src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
            alt="">
    </div>
    <div class="p-2">
        <h1>${actual.libro.nombre_libro}</h1>
        <span class="text-sm text-gray-600">Autor: ${actual.libro.nombre_autor}</span>
        <div class="pt-2">
            <a href="/src/view/libro.html?isbn=${actual.libro.isbn}" id="btn-comprar-${actual.libro.isbn}"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Comprar</a>
        </div>
    </div>
    </div>
  `;
  }
  contentLibros.innerHTML = stringLibros;
}
getLibros();
