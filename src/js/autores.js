import { autores } from "./listas/listaAutores.js";
import { autor } from "./models/autor.js";

document.getElementById("btn-logout").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    logout();
  },
  false
);

document.getElementById("btn-search").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    search();
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

function search() {
  var value = document.getElementById("input-search").value;
  var ser = listaAutores.BuscarporNombre(value);
  if (ser != null) {
    window.location.href = `/src/view/autor.html?nombre=${ser.nombre_autor}`;
  } else {
    alert("No hemos encontrado este autor");
  }
}

getAutores();
function getAutores() {
  var actual = listaAutores.cabeza;
  var stringLibros = "";
  var contentLibros = document.getElementById("content-autores");

  for (let index = 0; index < listaAutores.contador; index++) {
    actual = actual.siguiente;
    console.log(actual.autor);
    stringLibros += `
    <a href="/src/view/autor.html?nombre=${actual.autor.nombre_autor}" class="my-4">
        <div class="shadow rounded-md overflow-hidden h-56 w-48">
            <div class=" bg-gray-50">
                <img class="h-40 w-full"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
                    alt="">

            </div>
            <div class="p-2 px-4">
                <span class="text-sm text-gray-600"><span class="font-semibold">Autor</span>: ${actual.autor.nombre_autor}</span><br>
            </div>
        </div>
    </a>
  `;
  }
  contentLibros.innerHTML = stringLibros;
}
