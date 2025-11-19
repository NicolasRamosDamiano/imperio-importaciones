let productosOriginales = [];
let productosMostrados = [];

function renderProductos(lista) {
    const productosSection = document.querySelector('.productos');
    productosSection.innerHTML = "";

    lista.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('producto');

        const mensaje = encodeURIComponent(
            `Hola, estoy interesado en el producto: ${producto.nombre}`
        );

        const enlaceWhatsapp = `https://wa.me/59899117174?text=${mensaje}`;

        const descripcion = producto.descripcion || "";
        const corta = descripcion.slice(0, 10) + "...";

        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <h2>${producto.nombre}</h2>
            <p>Precio: $${Number(producto.precio).toFixed(2)}</p>

            <p class="descripcion-corta">${corta}</p>
            <p class="descripcion-completa oculto">${descripcion}</p>

            <button class="ver-mas">Ver más</button>

            <a class="btn-w" href="${enlaceWhatsapp}" target="_blank">
                Consultar por WhatsApp
            </a>
        `;

        const boton = div.querySelector(".ver-mas");
        const cortaP = div.querySelector(".descripcion-corta");
        const completaP = div.querySelector(".descripcion-completa");

        boton.addEventListener("click", () => {
            const oculto = completaP.classList.toggle("oculto");
            boton.textContent = oculto ? "Ver más" : "Ver menos";
            cortaP.classList.toggle("oculto", !oculto);
        });

        productosSection.appendChild(div);
    });
}

fetch('http://localhost:3000/productos')
    .then(response => response.json())
    .then(json => {
        productosOriginales = json;
        productosMostrados = [...json];
        renderProductos(productosMostrados);
    });

document.getElementById("buscador").addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();

    productosMostrados = productosOriginales.filter(p =>
        p.nombre.toLowerCase().includes(texto)
    );

    renderProductos(productosMostrados);
});


document.getElementById("orden-asc").addEventListener("click", () => {
    productosMostrados.sort((a, b) => a.precio - b.precio);
    renderProductos(productosMostrados);
});

document.getElementById("orden-desc").addEventListener("click", () => {
    productosMostrados.sort((a, b) => b.precio - a.precio);
    renderProductos(productosMostrados);
});
