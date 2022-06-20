import { libros } from "./listas/listaLibros.js";
import { libro } from "./models/libro.js";

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

var listaLibros = new libros();

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
    listaLibros.insertar(nuevoLibro);
  }
}

getLibros();
function getLibros() {
  var actual = listaLibros.cabeza;
  var stringLibros = "";
  var contentLibros = document.getElementById("content-libros");

  for (let index = 0; index < listaLibros.contador; index++) {
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
        <span class=" text-gray-600">Cantidad: ${actual.libro.cantidad}</span>
        <div class="pt-2">
        </div>
    </div>
    </div>
  `;
  }
  contentLibros.innerHTML = stringLibros;
}
