import { libros } from "./listas/listaLibros.js";
import { libro } from "./models/libro.js";
import { usuarios } from "./listas/listaUsuarios.js";
import { usuario } from "./models/usuario.js";

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
var isbn = urlParams.get("isbn");

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
var listaUsuarios = new usuarios();
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

var librosStorage = JSON.parse(window.localStorage.getItem("libros"));

if (librosStorage) {
  for (let x of librosStorage) {
    if (x.isbn == isbn) {
      document.getElementById("libro-nombre").innerText = x.nombre_libro;
      document.getElementById("libro-autor").innerText = x.nombre_autor;
      document.getElementById(
        "libro-cantidad"
      ).innerText = `Stock: ${x.cantidad}`;
    }
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
console.log(listaUsuarios.cabeza.usuario);
listaUsuarios.ordenarPorLibros();
console.log(listaUsuarios.cabeza.usuario);

document.getElementById("btn-comprar").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    comprar();
  },
  false
);
function comprar() {
  var cantidad = parseInt(document.getElementById("input-cantidad").value);
  if (cantidad > 0) {
    var guardarLibro = "";
    var guardarCantidad = 0;
    var guardarCola = 0;
    var actualLibro = listaLibros.cabeza;
    for (let index = 0; index < listaLibros.contador; index++) {
      actualLibro = actualLibro.siguiente;
      if (isbn == actualLibro.libro.isbn) {
        guardarLibro = actualLibro.libro;
        if (cantidad <= actualLibro.libro.cantidad) {
          actualLibro.libro.cantidad = actualLibro.libro.cantidad - cantidad;
          guardarCantidad = cantidad;
        } else {
          guardarCola = cantidad - actualLibro.libro.cantidad;
          guardarCantidad = actualLibro.libro.cantidad;
          actualLibro.libro.cantidad = 0;
        }
      }
    }
    if (guardarCola > 0) {
      var bandera = true;
      var actualLibroCola = listaCola.cabeza;

      for (let index = 0; index < listaCola.contador; index++) {
        actualLibroCola = actualLibroCola.siguiente;
        console.log(actualLibroCola);

        if (isbn == actualLibroCola.libro.isbn) {
          actualLibroCola.libro.cantidad =
            guardarCola + actualLibroCola.libro.cantidad;
          bandera = false;
        }
      }
      if (bandera) {
        var nuevoLibro = new libro(
          guardarLibro.isbn,
          guardarLibro.nombre_autor,
          guardarLibro.nombre_libro,
          guardarCola,
          guardarLibro.fila,
          guardarLibro.columna,
          guardarLibro.paginas,
          guardarLibro.categoria
        );
        listaCola.insertar(nuevoLibro);
      }
      listaCola.cola();
    }

    listaLibros.recorrer();

    var actualUsuario = listaUsuarios.cabeza;
    for (let index = 0; index < listaUsuarios.contador; index++) {
      actualUsuario = actualUsuario.siguiente;
      if (user.dpi == actualUsuario.usuario.dpi) {
        var actualLibro = actualUsuario.usuario.listaLibros.cabeza;
        var bandera = true;
        for (
          let indexx = 0;
          indexx < actualUsuario.usuario.listaLibros.contador;
          indexx++
        ) {
          actualLibro = actualLibro.siguiente;
          if (actualLibro.libro.isbn == guardarLibro.isbn) {
            bandera = false;
            actualLibro.libro.cantidad += guardarCantidad;
          }
        }
        if (bandera) {
          var nuevoLibro = new libro(
            guardarLibro.isbn,
            guardarLibro.nombre_autor,
            guardarLibro.nombre_libro,
            guardarCantidad,
            guardarLibro.fila,
            guardarLibro.columna,
            guardarLibro.paginas,
            guardarLibro.categoria
          );
          actualUsuario.usuario.listaLibros.insertar(nuevoLibro);
          break;
        }
      }
    }
    listaUsuarios.recorrer(user.dpi);
    alert("Procesado");
    window.location.href = "/src/view/usuario.html";
  } else {
    alert("Cantidad no valida");
  }
}
