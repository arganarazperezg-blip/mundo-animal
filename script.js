document.addEventListener('DOMContentLoaded', () => {
  const buscador = document.getElementById('buscador');
  const botones = [...document.querySelectorAll('[data-filtro]')];
  const productos = [...document.querySelectorAll('.producto')];
  const secciones = [...document.querySelectorAll('.catalogo-seccion')];
  const resultados = document.getElementById('resultados');
  const sinResultados = document.getElementById('sin-resultados');
  let categoria = 'todos';
  const normalizar = texto => texto.toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  function filtrar() {
    const busqueda = normalizar(buscador.value.trim());
    let visibles = 0;
    productos.forEach(producto => {
      const nombre = normalizar(producto.querySelector('h3')?.textContent || '');
      const descripcion = normalizar(producto.querySelector('.producto-contenido p')?.textContent || '');
      const coincide = (categoria === 'todos' || producto.dataset.categoria === categoria) && (nombre.includes(busqueda) || descripcion.includes(busqueda));
      producto.hidden = !coincide;
      if (coincide) visibles++;
    });
    secciones.forEach(seccion => { seccion.hidden = ![...seccion.querySelectorAll('.producto')].some(producto => !producto.hidden); });
    sinResultados.hidden = visibles !== 0;
    resultados.textContent = `${visibles} ${visibles === 1 ? 'producto encontrado' : 'productos encontrados'}`;
  }
  buscador.addEventListener('input', filtrar);
  botones.forEach(boton => boton.addEventListener('click', () => {
    categoria = boton.dataset.filtro;
    botones.forEach(b => { const activo = b === boton; b.classList.toggle('activo', activo); b.setAttribute('aria-pressed', String(activo)); });
    filtrar();
  }));
  filtrar();
});