class nodo {
  constructor(libro) {
    this.libro = libro;
    this.siguiente = null;
  }
}

export class listaLibros {
  constructor() {
    this.cabeza = null;
    this.contador = 0;
  }

  insertar(libro) {
    if (this.cabeza == null) {
      this.cabeza = new nodo(libro);
      this.cabeza.siguiente = this.cabeza;
      this.contador = this.contador + 1;
    } else {
      var actual = this.cabeza;
      if (this.contador == 1) {
        var tempo = new nodo(libro);
        actual.siguiente = tempo;
        tempo.siguiente = this.cabeza;
        this.contador = this.contador + 1;
      } else {
        var actual = this.cabeza;
        for (let index = 0; index < this.contador - 1; index++) {
          actual = actual.siguiente;
        }
        var tempo = new nodo(libro);
        actual.siguiente = tempo;
        tempo.siguiente = this.cabeza;
        this.contador = this.contador + 1;
      }
    }
  }

  recorrer() {
    let libros = "[";
    var actual = this.cabeza;
    for (let index = 0; index < this.contador; index++) {
      actual = actual.siguiente;
      libros += JSON.stringify(actual.libro);
      if (index != this.contador - 1) {
        libros += ",";
      }
    }
    libros += "]";
    window.localStorage.setItem("libros", libros);
  }
}
