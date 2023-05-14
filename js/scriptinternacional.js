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
});
}
getproductos();

