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

  graficarDerecha() {
    var codigodot =
      'digraph G{size="85";\nlabel=" Inicio a fin ";\nnode [shape=doublecircle];N0;\nnode [shape=circle];\n';
    var temporal = this.cabeza;
    var conexiones = "";
    var nodos = "";
    var numnodo = 0;
    for (let index = 0; index < this.contador; index++) {
      console.log(temporal, "temporal");
      nodos +=
        "N" +
        numnodo +
        '[label="' +
        temporal.usuario.nombre_completo +
        '" ];\n';
      if (temporal.siguiente != this.cabeza) {
        var auxnum = numnodo + 1;
        conexiones +=
          "N" + numnodo + " -> N" + auxnum + '[label="=>" dir=both];\n';
      } else {
        var auxnum = numnodo + 1;
        conexiones += "N" + numnodo + " -> N" + 0 + "[dir=both];\n";
      }
      temporal = temporal.siguiente;
      numnodo++;
    }
    codigodot += nodos + "\n";
    codigodot += "{rank=same;\n" + conexiones + "\n}\n}";
    console.log(codigodot);
    if (document.getElementById("lectors")) {
      d3.select("#lectors")
        .graphviz()
        .width(1200)
        .height(300)
        .renderDot(codigodot);
    }
  }
  graficarAdmin() {
    var codigodot =
      'digraph G{size="3";\nlabel=" Inicio a fin ";\nnode [shape=doublecircle];N0;\nnode [shape=circle];\n';
    var temporal = this.cabeza;
    var conexiones = "";
    var nodos = "";
    var numnodo = 0;
    for (let index = 0; index < this.contador; index++) {
      nodos +=
        "N" +
        numnodo +
        '[label="' +
        temporal.usuario.nombre_completo +
        '" ];\n';
      if (temporal.siguiente != this.cabeza) {
        var auxnum = numnodo + 1;
        conexiones +=
          "N" + numnodo + " -> N" + auxnum + '[label="=>" dir=both];\n';
      } else {
        var auxnum = numnodo + 1;
        conexiones += "N" + numnodo + " -> N" + 0 + "[dir=both];\n";
      }
      temporal = temporal.siguiente;
      numnodo++;
    }
    codigodot += nodos + "\n";
    codigodot += "{rank=same;\n" + conexiones + "\n}\n}";
    console.log(codigodot);
    if (document.getElementById("table-users")) {
      d3.select("#table-users")
        .graphviz()
        .width(1200)
        .height(300)
        .renderDot(codigodot);
    }
  }
}
