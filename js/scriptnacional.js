const nacionalfilter = document.getElementById("nacionalfilter")

const getproductos = async () => {
    const response = await fetch("../data.json");
    const data = await response.json();

const filtroNacional = data.filter((Element) => {
    return Element.tipo === "nacional";
});

filtroNacional.forEach((element) => {
        let listaNacional = document.createElement("div");
        listaNacional.className = "card";
        listaNacional.innerHTML = `
            <img src = ".${element.img}">
            <h3>${element.destino}</h3>
            <p class = "price">$ ${element.precio} </p>`;
        nacionalfilter.append(listaNacional);

        let comprar = document.createElement("button");
        comprar.innerText = "Reservar";
        comprar.className = "reservar";
        listaNacional.append(comprar);

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