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
});
}
getproductos();