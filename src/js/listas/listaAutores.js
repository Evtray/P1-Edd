class nodo {
    constructor(autor) {
      this.autor = autor;
      this.siguiente = null;
    }
  }
  
  export class listaAutores {
    constructor() {
      this.cabeza = null;
      this.contador = 0;
    }
  
    insertar(autor) {
      if (this.cabeza == null) {
        this.cabeza = new nodo(autor);
        this.cabeza.siguiente = this.cabeza;
        this.contador = this.contador + 1;
      } else {
        var actual = this.cabeza;
        if (this.contador == 1) {
          var tempo = new nodo(autor);
          actual.siguiente = tempo;
          tempo.siguiente = this.cabeza;
          this.contador = this.contador + 1;
        } else {
          var actual = this.cabeza;
          for (let index = 0; index < this.contador - 1; index++) {
            actual = actual.siguiente;
          }
          var tempo = new nodo(autor);
          actual.siguiente = tempo;
          tempo.siguiente = this.cabeza;
          this.contador = this.contador + 1;
        }
      }
    }
  
    recorrer() {
      let autores = "[";
      var actual = this.cabeza;
      for (let index = 0; index < this.contador; index++) {
        actual = actual.siguiente;
        autores += JSON.stringify(actual.autor);
        if (index != this.contador - 1) {
          autores += ",";
        }
      }
      autores += "]";
      window.localStorage.setItem("autores", autores);
    }
  }
  