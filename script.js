

document.addEventListener("DOMContentLoaded", () => {
  const buscador = document.getElementById("buscador");
  const botones = document.querySelectorAll("[data-filtro]");
  const productos = document.querySelectorAll(".producto");

  let categoria = "todos";

  function filtrarProductos() {
    const texto = buscador.value.toLowerCase().trim();

    productos.forEach(producto => {
      const nombre = producto.querySelector("h3")?.textContent.toLowerCase() || "";
      const seccion = producto.closest("section")?.id || "";

      const coincideTexto = nombre.includes(texto);
      const coincideCategoria =
        categoria === "todos" ||
        seccion === categoria;

      producto.style.display =
        coincideTexto && coincideCategoria ? "" : "none";
    });
  }

  if (buscador) {
    buscador.addEventListener("input", filtrarProductos);
  }

  botones.forEach(boton => {
    boton.addEventListener("click", () => {
      categoria = boton.dataset.filtro;
      filtrarProductos();
    });
  });
});
