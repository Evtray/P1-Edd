import { listaCircular } from "./listas/listaUsuarios.js";
import { usuario } from "./models/usuario.js";

document.getElementById("btn-users").addEventListener(
  "click",
  function (event) {
    event.preventDefault();
    loadFile("usuarios");
  },
  false
);

export var listaUsuarios = new listaCircular();
var types
function loadFile(type) {
  types = type
  var input, file, fr;
  input = document.getElementById(`files-${type}`);

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
  console.log("; ");

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
