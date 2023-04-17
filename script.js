const contenido = document.getElementById("contenido")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const paquetes = [
    {
        id: 1,
        destino: "Miami",
        precio: 6500,
        img: src="./img/miami.jpg"
    },
    {
        id: 2,
        destino: "Londres",
        precio: 10500,
        img: src="./img/londres.jpg"
    },
    {
        id: 3,
        destino: "Paris",
        precio: 18500,
        img: src="./img/paris.jpg"
    },
    {
        id: 4,
        destino: "Caribe",
        precio: 6300,
        img: src="./img/punta_cana.jpg"
    },
];
let carrito = [];

    paquetes.forEach((paquets) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${paquets.img}">
            <h3>${paquets.destino}</h3>
            <p class="price">${paquets.precio} $ </p>`;
            contenido.append(content);

        let comprar = document.createElement("button");
        comprar.innerText = "Reservar";
        comprar.className = "reservar";
        content.append(comprar);

            comprar.addEventListener("click", () => {
                carrito.push({
                    id: paquets.id,
                    img: paquets.img,
                    destino: paquets.destino,
                    precio: paquets.precio,
                });
            });
    });

    verCarrito.addEventListener("click", () => {
        modalContainer.innerHTML = "";
        modalContainer.style.display="flex";
        const modalHeader = document.createElement("div");
            modalHeader.className = "header__modal"
            modalHeader.innerHTML = `<h1 class="header__modal-titulo">Tus reservas:</h1>`;
        modalContainer.append(modalHeader);

        const modalbutton = document.createElement("h1");
            modalbutton.innerText = "X";
            modalbutton.className="header__modal-button";

            modalbutton.addEventListener("click", () => {
                modalContainer.style.display="none";
            });

            modalHeader.append(modalbutton);



        carrito.forEach((paquets) => {
            let carritoContenido = document.createElement("div");
                carritoContenido.className = "modal-content";
                carritoContenido.innerHTML = `
                <img src="${paquets.img}">
                <h3>${paquets.destino}</h3>
                <p>${paquets.precio}$</p>`;

            modalContainer.append(carritoContenido);
        });

        const total = carrito.reduce((acc, paquets) => acc + paquets.precio, 0);
        const totalCompra = document.createElement("div")
        totalCompra.className = "total__contenido"
        totalCompra.innerHTML = `total a pagar: ${total}$`;
        modalContainer.append(totalCompra);
    });



