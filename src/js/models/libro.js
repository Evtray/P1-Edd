export class libro {
  constructor(
    isbn,
    nombre_autor,
    nombre_libro,
    cantidad,
    fila,
    columna,
    paginas,
    categoria
  ) {
    this.isbn = isbn;
    this.nombre_autor = nombre_autor;
    this.nombre_libro = nombre_libro;
    this.cantidad = cantidad;
    this.fila = fila;
    this.columna = columna;
    this.paginas = paginas;
    this.categoria = categoria;
  }
}
