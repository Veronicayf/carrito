const internacionalfilter = document.getElementById("internacionalfilter")

const getproductos = async () => {
    const response = await fetch("../data.json");
    const data = await response.json();

const filtroInternacional = data.filter((Element) => {
    return Element.tipo === "internacional";
});

filtroInternacional.forEach((element) => {
        let listaInternacional = document.createElement("div");
        listaInternacional.className = "card";
        listaInternacional.innerHTML = `
            <img src = ".${element.img}">
            <h3>${element.destino}</h3>
            <p class = "price">$ ${element.precio} </p>`;
        nacionalfilter.append(listaInternacional);

        let comprar = document.createElement("button");
        comprar.innerText = "Reservar";
        comprar.className = "reservar";
        listaInternacional.append(comprar);

        comprar.addEventListener("click", () => {
        const repetido = carrito.some((repetirproducto) => repetirproducto.id === element.id);
        if(repetido){
            carrito.map((producto) => {
                if(producto.id === element.id){
                    producto.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: element.id,
                img: element.img,
                destino: element.destino,
                precio: element.precio,
                cantidad: element.cantidad,
            });
        }
        console.log(carrito);
        console.log(carrito.length);
        carrito();
        saveInfo();

        });

});
}
getproductos();

