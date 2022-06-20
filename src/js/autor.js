import { autores } from "./listas/listaAutores.js";
import { autor } from "./models/autor.js";

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var nombre = urlParams.get("nombre");

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

var listaAutores = new autores();

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
    listaAutores.insertar(nuevoAutor);
  }
}

var search = listaAutores.BuscarporNombre(nombre);

var html = document.getElementById("content-autor");
html.innerHTML = `<h1 class="text-3xl tracking-tight font-extrabold text-gray-900">
        <span class="block inline">Autor: ${search.nombre_autor}</span>
        </h1>
        <div class="my-4 text-gray-600">
        <a><i class="fas fa-at"></i> ${search.correo}</a><br>
        <a><i class="fas fa-phone"></i> ${search.telefono}</a><br>
        <a><i class="fas fa-map-marker"></i> ${search.direccion}</a><br>

        <p class="mt-4">Biografia:
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
            software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>
        </div>`;
