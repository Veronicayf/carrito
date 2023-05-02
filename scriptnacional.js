const internacionalfilter = [];


const filtroNacional = paquetes.filter((Element) => {
    return Element.tipo === "nacional";
});

const listaNacional = document.createElement("ul");

    filtroNacional.forEach(element => {
        const item = document.createElement("li");
        item.className = "card";
        item.innerText = `
            <img src = "${element.img}">
            <h3>${element.destino}</h3>
            <p class = "price"> ${element.precio} </p>;
        `;
        listaNacional.appendChild(item);
    });

    const destinosNacionales = document.getElementById("internacionalfilter");
    destinosNacionales.appendChild(listaNacional);

