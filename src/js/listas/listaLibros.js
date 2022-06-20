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
  ordenarAlfa() {
    for (let i = 0; i < this.contador + 1; i++) {
      var actualNuevo = this.cabeza;
      for (let j = 0; j < this.contador; j++) {
        console.log(
          actualNuevo.libro.nombre_libro,
          actualNuevo.siguiente.libro.nombre_libro
        );
        if (
          actualNuevo.siguiente != null &&
          actualNuevo.libro.nombre_libro >
            actualNuevo.siguiente.libro.nombre_libro
        ) {
          var nodoJ = actualNuevo.libro;
          var nodoJ2 = actualNuevo.siguiente.libro;
          actualNuevo.libro = nodoJ2;
          actualNuevo.siguiente.libro = nodoJ;
        } else {
          actualNuevo = actualNuevo.siguiente;
        }
      }
    }
  }
  ordenarInAlfa() {
    for (let i = 0; i < this.contador + 1; i++) {
      var actualNuevo = this.cabeza;
      for (let j = 0; j < this.contador; j++) {
        if (
          actualNuevo.siguiente != null &&
          actualNuevo.libro.nombre_libro <
            actualNuevo.siguiente.libro.nombre_libro
        ) {
          var nodoJ = actualNuevo.libro;
          var nodoJ2 = actualNuevo.siguiente.libro;
          actualNuevo.libro = nodoJ2;
          actualNuevo.siguiente.libro = nodoJ;
        } else {
          actualNuevo = actualNuevo.siguiente;
        }
      }
    }
  }
}
