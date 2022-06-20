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
  ordenarPorLibros() {
    for (let i = 0; i < this.contador + 1; i++) {
      var actual = this.cabeza;
      for (let j = 0; j < this.contador; j++) {
        if (actual.siguiente != null) {
          var cantidad1 = actual.usuario.listaLibros.cantidadLibros();
          var cantidad2 = actual.siguiente.usuario.listaLibros.cantidadLibros();
          if (actual.siguiente != null && cantidad1 > cantidad2) {
            var temp1 = actual.usuario;
            var temp2 = actual.siguiente.usuario;
            actual.usuario = temp2;
            actual.siguiente.usuario = temp1;
          }
          actual = actual.siguiente;
        }
      }
    }
  }
  topLibros() {
    if (this.cabeza != null) {
      this.ordenarPorLibros();
      var codigodot =
        'digraph G{\nlabel=" Top lectores ";\nnode [shape=box];\n';
      var actual = this.cabeza;
      var conexiones = "";
      var nodos = "";
      var noNode = 0;
      var contandor = 0;
      for (let i = 0; i < 5; i++) {
        var cantidad = actual.usuario.listaLibros.cantidadLibros();
        console.log(cantidad);
        if (cantidad > 0) {
          nodos += `N ${noNode} [label="Usuario: ${actual.usuario.nombre_usuario}; Libros: ${cantidad}" ]`;
          actual = actual.siguiente;
          noNode++;
          contandor++;
        }
      }
      var contador = 0;
      if (contandor > 1) {
        for (let j = 0; j < contandor - 1; j++) {
          var temp = contador + 1;
          conexiones += `N ${contador}-> N ${temp} [label="" dir=both];\n`;
          contador++;
        }
      }
      codigodot += nodos + "\n";
      codigodot += "{rank=same;\n" + conexiones + "\n}\n}";
      d3.select("#graph-top")
        .graphviz()
        .width(1400)
        .height(1400)
        .renderDot(codigodot);
    }
  }
}
