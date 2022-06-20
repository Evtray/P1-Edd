import { usuarios } from "./listas/listaUsuarios.js";
import { usuario } from "./models/usuario.js";

export var listaUsuarios = new usuarios();

var users = JSON.parse(window.localStorage.getItem("users"));

if (users) {
  for (let x of users) {
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
}

document.getElementById("btn-login").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    login();
  },
  false
);
function login() {
  var bandera = true;
  var usuario = document.getElementById("email-address").value;
  var contra = document.getElementById("password").value;
  var actual = listaUsuarios.cabeza;
  if ("Wilfred" == usuario && contra == contra) {
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        dpi: 2354168452525,
        nombre_completo: "WIlfred Perez",
        nombre_usuario: "Wilfred",
        contrasenia: "123",
        rol: "Administrador",
        telefono: "+502 (123) 123-4567",
      })
    );
    window.location.href = "/src/view/admin.html";
    bandera = false;
  } else {
    for (let index = 0; index < listaUsuarios.contador; index++) {
      actual = actual.siguiente;
      if (
        actual.usuario.nombre_usuario == usuario &&
        actual.usuario.contrasenia == contra
      ) {
        window.location.href = "/src/view/usuario.html";
        window.localStorage.setItem("user", JSON.stringify(actual.usuario));
        bandera = false;
      }
    }
  }
  if (bandera) {
    alert("Usuario no encontrado");
  }
}
