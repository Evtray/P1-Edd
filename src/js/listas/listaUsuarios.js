class nodo {
  constructor(usuario) {
    this.usuario = usuario;
    this.siguiente = null;
  }
}

export class usuarios {
  constructor() {
    this.cabeza = null;
    this.contador = 0;
  }

  insertar(usuario) {
    if (this.cabeza == null) {
      this.cabeza = new nodo(usuario);
      this.cabeza.siguiente = this.cabeza;
      this.contador = this.contador + 1;
    } else {
      var actual = this.cabeza;
      if (this.contador == 1) {
        var tempo = new nodo(usuario);
        actual.siguiente = tempo;
        tempo.siguiente = this.cabeza;
        this.contador = this.contador + 1;
      } else {
        var actual = this.cabeza;
        for (let index = 0; index < this.contador - 1; index++) {
          actual = actual.siguiente;
        }
        var tempo = new nodo(usuario);
        actual.siguiente = tempo;
        tempo.siguiente = this.cabeza;
        this.contador = this.contador + 1;
      }
    }
  }

  recorrer(dpi = "") {
    let users = "[";
    var actual = this.cabeza;
    for (let index = 0; index < this.contador; index++) {
      var actual = actual.siguiente;

      let libros = "[";
      if (actual.usuario.listaLibros != "[]") {
        var actualLibro = actual.usuario.listaLibros.cabeza;
        for (
          let indexx = 0;
          indexx < actual.usuario.listaLibros.contador;
          indexx++
        ) {
          actualLibro = actualLibro.siguiente;
          libros += JSON.stringify(actualLibro.libro);
          if (indexx != actual.usuario.listaLibros.contador - 1) {
            libros += ",";
          }
        }
      }
      libros += "]";
      if (dpi == actual.usuario.dpi) {
        window.localStorage.setItem("user-libros", libros);
      }
      users += JSON.stringify({
        dpi: actual.usuario.dpi,
        nombre_completo: actual.usuario.nombre_completo,
        nombre_usuario: actual.usuario.nombre_usuario,
        correo: actual.usuario.correo,
        rol: actual.usuario.rol,
        contrasenia: actual.usuario.contrasenia,
        telefono: actual.usuario.telefono,
        listaLibros: libros,
      });
      if (index != this.contador - 1) {
        users += ",";
      }
    }
    users += "]";
    window.localStorage.setItem("users", users);
  }
  ordenarPorLibros(){
    
  }
  topLibros() {

  }
}
