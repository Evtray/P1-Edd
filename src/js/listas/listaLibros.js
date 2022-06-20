class nodo {
  constructor(libro) {
    this.libro = libro;
    this.siguiente = null;
  }
}

export class libros {
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

  cola() {
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
    console.log(libros);

    window.localStorage.setItem("cola", libros);
  }
  cantidadLibros() {
    var cantidad = 0;
    var actual = this.cabeza;
    for (let index = 0; index < this.contador; index++) {
      actual = actual.siguiente;
      cantidad += actual.libro.cantidad;
    }
    return cantidad;
  }
  ordenarAscendente() {
    for (let i = 0; i < this.contador + 1; i++) {
      var actual = this.cabeza;
      for (let j = 0; j < this.contador; j++) {
        if (
          actual.siguiente != null &&
          actual.libro.nombre_libro >
            actual.siguiente.libro.nombre_libro
        ) {
          var temp1 = actual.libro;
          var temp2 = actual.siguiente.libro;
          actual.libro = temp2;
          actual.siguiente.libro = temp1;
        } else {
          actual = actual.siguiente;
        }
      }
    }
  }
  ordenarDescendente() {
    for (let i = 0; i < this.contador + 1; i++) {
      var actual = this.cabeza;
      for (let j = 0; j < this.contador; j++) {
        if (
          actual.siguiente != null &&
          actual.libro.nombre_libro <
            actual.siguiente.libro.nombre_libro
        ) {
          var temp1 = actual.libro;
          var temp2 = actual.siguiente.libro;
          actual.libro = temp2;
          actual.siguiente.libro = temp1;
        } else {
          actual = actual.siguiente;
        }
      }
    }
  }
}
