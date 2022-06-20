class nodo {
    constructor(autor) {
        this.autor = autor
        this.izq = null
        this.der = null
    }
}


export class reporteArbol {
    constructor() {
        this.raiz = null
    }
    insertar(autor) {
        let nuevo_autor = new nodo(autor)
        if (!this.raiz) {
            this.raiz = nuevo_autor
        } else {
            this.raiz = this.nuevoNodo(this.raiz, nuevo_autor)
        }
    }

    nuevoNodo(raiz_actual, nuevo_autor) {
        if (raiz_actual) {
            var a = String(raiz_actual.autor.nombre_autor);
            var b = String(nuevo_autor.autor.nombre_autor);
            var x = a.toLocaleLowerCase();
            var y = b.toLocaleLowerCase();
            if (x > y) {
                raiz_actual.izq = this.nuevoNodo(raiz_actual.izq, nuevo_autor);
            } else if (x < y) {
                raiz_actual.der = this.nuevoNodo(raiz_actual.der, nuevo_autor);
            }
        } else { raiz_actual = nuevo_autor }
        return raiz_actual;
    }

    generarGrafico() {
        let c = "digraph reporteAutores {size=\"12\";\n"
        c += this.cadena(this.raiz)
        c += "\n"
        c += this.enlazar(this.raiz)
        c += "\n}"
        console.log(c)
        d3.select('#reporte-autores').graphviz()
            .width(1080)
            .height(1020)
            .renderDot(c)
    }

    cadena(raiz_actual) {
        let n = ""
        if (raiz_actual) {
            n += "n" + raiz_actual.autor.dpi + "[label=\"" + raiz_actual.autor.nombre_autor + "\"]\n"
            n += this.cadena(raiz_actual.izq)
            n += this.cadena(raiz_actual.der)
        }
        return n
    }

    enlazar(raiz_actual) {
        let c = ""
        if (raiz_actual) {
            c += this.enlazar(raiz_actual.izq)
            c += this.enlazar(raiz_actual.der)
            if (raiz_actual.izq) {
                c += "n" + raiz_actual.autor.dpi + "-> n" + raiz_actual.izq.autor.dpi + "\n"
            }
            if (raiz_actual.der) {
                c += "n" + raiz_actual.autor.dpi + "-> n" + raiz_actual.der.autor.dpi + "\n"
            }
        }
        return c
    }
}



