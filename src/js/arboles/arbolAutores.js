class nodo {
    constructor(autor) {
        this.autor = autor
        this.izq = null
        this.der = null
    }
}
var autorEncontrado;
export class abb {
    constructor() {
        this.raiz = null
    }
    insertar(autor) {
        let aux = new nodo(autor)
        if (this.raiz == null) {
            this.raiz = aux
        } else {
            this.raiz = this.insertarNodo(this.raiz, aux)
        }
    }

    devolverRaiz() {
        return this.raiz
    }

    insertarNodo(raizActual, aux) {
        if (raizActual != null) {
            var a = String(raizActual.autor.nombre_autor)
            var x = a.toLocaleLowerCase()
            var b = String(aux.autor.nombre_autor)
            var y = b.toLocaleLowerCase()
            if (x > y) {
                raizActual.izq = this.insertarNodo(raizActual.izq, aux)
            } else if (x < y) {
                raizActual.der = this.insertarNodo(raizActual.der, aux)
            } else {
                console.log("Ese man ya existe")
            }
            return raizActual
        } else {
            raizActual = aux
            return raizActual
        }
    }

    generarDot() {
        let cadena = "digraph arbolAutores {size=\"12\";\n"
        cadena += this.cadenNodos(this.raiz)
        cadena += "\n"
        cadena += this.enlazar(this.raiz)
        cadena += "\n}"
        console.log(cadena)
        d3.select('#table-autors').graphviz()
            .width(1400)
            .height(1000)
            .renderDot(cadena)
    }

    cadenNodos(raizActual) {
        let nodos = ""
        if (raizActual != null) {
            nodos += "n" + raizActual.autor.dpi + "[label=\"" + raizActual.autor.nombre_autor + "\"]\n"
            nodos += this.cadenNodos(raizActual.izq)
            nodos += this.cadenNodos(raizActual.der)
        }
        return nodos
    }

    enlazar(raizActual) {
        let cadena = ""
        if (raizActual != null) {
            cadena += this.enlazar(raizActual.izq)
            cadena += this.enlazar(raizActual.der)
            if (raizActual.izq != null) {
                // cadena += "n" + raizActual.izq.autor.dpi + "-> n" + raizActual.autor.dpi + "\n"
                cadena += "n" + raizActual.autor.dpi + "-> n" + raizActual.izq.autor.dpi + "\n"
            }
            if (raizActual.der != null) {
                // cadena += "n" + raizActual.der.autor.dpi + "-> n" +raizActual.autor.dpi + "\n"
                cadena += "n" + raizActual.autor.dpi + "-> n" + raizActual.der.autor.dpi + "\n"
            }
        }
        return cadena
    }

    buscar(x) {
        var nombre = x.toLocaleLowerCase()
        var namee = nombre.replace(/ /g, "")
        var xcomp = this.buscador(this.raiz, namee)
        if (xcomp == "Existe") {
            var comp = this.buscarAutor(this.raiz, namee)
            alert("Si existe")
            return (comp)
        } else {
            alert("No existe")
            return (0)
        }
    }
    buscarAutor(raiz, b) {
        var nombrex = raiz.autor.nombre_autor
        var nombres = nombrex.toLocaleLowerCase()
        var namees = nombres.replace(/ /g, "")
        if (raiz === null) {
            return null;
        } else if (b < namees) {
            return this.buscarAutor(raiz.izq, b);
        } else if (b > namees) {
            return this.buscarAutor(raiz.der, b);
        }
        else {
            return raiz.autor;
        }
    }

    buscador(raiz, b) {
        if (raiz != null) {
            var nombrex = raiz.autor.nombre_autor
            var nombres = nombrex.toLocaleLowerCase()
            var namees = nombres.replace(/ /g, "")
            var x = this.buscador(raiz.izq, b)
            var y = this.buscador(raiz.der, b)
            if (namees == b || x == "Existe" || y == "Existe") {
                return ("Existe")
            }
        }
    }
}



