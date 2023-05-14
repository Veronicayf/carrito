const contenido = document.getElementById("contenido")
const verCarrito = document.getElementById("verCarrito")
const modalContainer = document.getElementById("modalContainer")
const cantidadCarrito = document.getElementById("cantidadCarrito")


let carrito = JSON.parse(localStorage.getItem("reservas")) || [];

const getproductos = async () => {
    const response = await fetch("./data.json");
    const data = await response.json();

    data.forEach((paquets) => {
        let content = document.createElement("div");
        content.className = "card";
        content.innerHTML = `
            <img src="${paquets.img}">
            <h3>${paquets.destino}</h3>
            <p class="price"> $ ${paquets.precio} </p>`;
            contenido.append(content);

        let comprar = document.createElement("button");
        comprar.innerText = "Reservar";
        comprar.className = "reservar";
        content.append(comprar);
            
            //clikc al boton reservar
            comprar.addEventListener("click", () => {
            const repetido = carrito.some((repetirProducto) => repetirProducto.id === paquets.id);
            
            if (repetido){
                carrito.map((prod) => {
                    if(prod.id === paquets.id){
                        prod.cantidad++;
                    }
                });
            } else {   
            carrito.push({
                    id: paquets.id,
                    img: paquets.img,
                    destino: paquets.destino,
                    precio: paquets.precio,
                    cantidad: paquets.cantidad,
                });
            }
                console.log(carrito);
                console.log(carrito.length);
                carritoContador();
                saveInfo();
            });
    });
        //icono de carrito
        const pintarCarrito = () => {
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


        //contenido de carrito
        carrito.forEach((paquets) => {
            let carritoContenido = document.createElement("div");
                carritoContenido.className = "modal-content";
                carritoContenido.innerHTML = `
                <img src="${paquets.img}">
                <h3>${paquets.destino}</h3>
                <p>${paquets.precio}$</p>
                <p> Cantidad: ${paquets.cantidad} </p>
                <p> Total: ${paquets.cantidad * paquets.precio}$</p>
                <span class="delete__producto">✖️</span>`;

            modalContainer.append(carritoContenido);

            let eliminar = carritoContenido.querySelector(".delete__producto");

            eliminar.addEventListener("click", () => {
                eliminarReserva(paquets.id);
            });

        });


        // calculo de precios
        const total = carrito.reduce((acc, paquets) => acc + paquets.precio * paquets.cantidad, 0);
        const totalCompra = document.createElement("div")
            totalCompra.className = "total__contenido"
            totalCompra.innerHTML = `total a pagar: ${total}$`;
            modalContainer.append(totalCompra);
        };
        verCarrito.addEventListener("click", pintarCarrito);

        const eliminarReserva = (id) => {
            const encontrarId = carrito.find((elemento) => elemento.id === id);

            carrito = carrito.filter((carritoId) =>{
                return carritoId !== encontrarId; 
            });
            carritoContador();
            saveInfo();
            pintarCarrito();
        };
        //etiqueta contadora
        const carritoContador = () => {
            cantidadCarrito.style.display = "block";

            const carritoLista = carrito.length;

            localStorage.setItem("carritoLista", JSON.stringify(carritoLista));
            cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLista"));

            cantidadCarrito.innerText = carrito.length;
        };

        //local storage
        const saveInfo = () => {
            localStorage.setItem("reservas", JSON.stringify(carrito));
            
        };
    
}
    getproductos();

        JSON.parse(localStorage.getItem("reservas"));