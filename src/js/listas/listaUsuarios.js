class nodo {
  constructor(usuario) {
    this.usuario = usuario;
    this.siguiente = null;
  }
}

export class listaCircular {
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

  recorrer() {
    let users = "[";
    var actual = this.cabeza;
    for (let index = 0; index < this.contador; index++) {
      actual = actual.siguiente;
      users += JSON.stringify(actual.usuario);
      if (index != this.contador - 1) {
        users += ",";
      }
    }
    users += "]";
    window.localStorage.setItem("users", users);
  }

  graficarDerecha() {
    var codigodot =
      'digraph G{size="3";\nlabel=" Inicio a fin ";\nnode [shape=doublecircle];N0;\nnode [shape=circle];\n';
    var temporal = this.cabeza;
    var conexiones = "";
    var nodos = "";
    var numnodo = 0;
    for (let index = 0; index < this.contador; index++) {
      console.log(temporal.usuario.nombre);
      nodos += "N" + numnodo + '[label="' + temporal.usuario.nombre + '" ];\n';
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
        .width(300)
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
      nodos += "N" + numnodo + '[label="' + temporal.usuario.nombre + '" ];\n';
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
        .width(300)
        .height(300)
        .renderDot(codigodot);
    }
  }
}
// var lista = new listaCircular();
// lista.insertar("JAJA")
// lista.insertar("Lolito")
// lista.insertar("Juanito")
// lista.recorrer()
