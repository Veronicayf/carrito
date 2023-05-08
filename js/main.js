const content = document.getElementById("contenido");

const BOOKING_KEY = "bookings";

let allBookings = [];
let globalAmounts = 0;

const getGlobalAmount = () => {
  let auxAmount = 0;
  allBookings.forEach((elem) => {
    auxAmount = elem.amount + elem.price;
  });
  globalAmounts = auxAmount;
};

const getLocalData = () => {
  const data = JSON.parse(localStorage.getItem(BOOKING_KEY));
  if (data) {
    allBookings = data;
    getGlobalAmount();
  }
};

const setLocalData = (data) => {
  localStorage.setItem(BOOKING_KEY, JSON.stringify(data));
  getGlobalAmount();
};

const handleCurrencyFormat = (number) => {
  return Intl.NumberFormat("en-US").format(number);
};

const getBookingLength = () => {
  return (document.getElementById("booking-length").innerText =
    allBookings.length);
};

const shoppingCartData = () => {
  const modalTitle = document.getElementById("modal-title");
  const bookingList = document.getElementById("modal-body-list");
  const grandTotal = document.getElementById("grand-total");

  grandTotal.innerText = `${handleCurrencyFormat(globalAmounts)}`;

  bookingList.innerHTML = "";
  modalTitle.innerText = "Tus Reservaciones";

  if (!allBookings.length) {
    bookingList.innerHTML = `<p class="text-center">Aun no tienes reservaciones</p>`;
    return;
  }

  allBookings.map((elem) => {
    const bookingitem = document.createElement("li");

    bookingitem.className = "list-group-item";
    bookingitem.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <img src="${elem.photo}" alt="${
      elem.city
    }" class="rounded booked-img">
                <h5>${elem.city}</h5>
                <span>
                  <strong>Precio: </strong>
                  ${handleCurrencyFormat(elem.price)} $
                </span>
                <span>
                  <strong>Cantidad: </strong>
                  ${elem.amount}
                </span>
                <span>
                <strong>Total: </strong>
                ${handleCurrencyFormat(elem.amount * elem.price)} $
                </span>
                <button
                    type="button"
                    class="btn btn-danger"
                    onclick="handleDeleteBooking(${elem.id})"
                >Eliminar</button>
            </div>`;
    bookingList.append(bookingitem);
  });
};

const handleBooking = (id) => {
  const selectedItem = [...destinations].filter((item) => item.id === id)[0];
  const itemIndex = allBookings.findIndex((item) => item.id === id);

  if (itemIndex < 0) {
    allBookings.push(selectedItem);
  } else {
    Object.assign(selectedItem, { amount: selectedItem.amount + 1 });
    allBookings.splice(itemIndex, 1, selectedItem);
  }
  setLocalData(allBookings);
  getBookingLength();
};

const handleDeleteBooking = (id) => {
  const auxArray = allBookings.filter((item) => item.id !== id);
  setLocalData(auxArray);
  shoppingCartData();
  getLocalData();
  getBookingLength();
};

const handleShowModal = () => {
  const myModal = new bootstrap.Modal("#modal");
  myModal.show();
  shoppingCartData();
};

getLocalData();
getBookingLength();

destinations.map((elem) => {
  let itemCard = document.createElement("div");
  itemCard.className = "card col-sm-12 col-md-4 col-lg-3 custom-card";
  itemCard.innerHTML = `
        <img src="${elem.photo}" class="card-img-top" alt="${elem.city}">
        <div class="card-body">
        <h5 class="card-title">${elem.city}</h5>
        <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        <p class="card-text">${handleCurrencyFormat(elem.price)} $</p>
        <button
            id="booking-btn-${elem.id}"
            onclick="handleBooking(${elem.id})"
            class="btn btn-primary reservar"
        >Reservar</button>
        </div>
            `;
  content.append(itemCard);
});
