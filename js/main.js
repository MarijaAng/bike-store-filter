const bikeCards = document.querySelector("#bike-cards");
const allFilters = document.querySelectorAll(".filter");
const filterSection = document.querySelector("#filter-section");
const filterBtn = document.querySelector("#filter-button");

filterBtn.addEventListener("click", () => {
  if (window.innerWidth <= 768) {
    filterSection.classList.toggle("filter-visible");
  }
});

const bikes = [];

fetch("https://challenges.brainster.tech/ajax_data/data.json")
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((element) => {
      const newBike = {
        name: element.name,
        price: element.price,
        gender: element.gender,
        brand: element.brand,
        image: element.image,
      };
      bikes.push(newBike);
    });
    console.log(bikes);
    displayCards(bikes);
    updateBagdes();
  })
  .catch((err) => {
    console.log("err", err);
  });

function renderCard(data) {
  const cardCol = document.createElement("div");
  cardCol.classList.add("col-12", "col-md-6", "col-lg-4", "mb-4");
  const card = document.createElement("div");
  card.classList.add("card", "h-100");
  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-top");
  cardImage.src = `img/${data.image}.png`;
  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body", "bg-orange");
  const cardTitle = document.createElement("h4");
  cardTitle.innerHTML = `${data.name}`;
  const cardText = document.createElement("p");
  cardText.innerHTML = `${data.price} $`;

  cardBody.append(cardTitle, cardText);
  card.append(cardImage, cardBody);
  cardCol.append(card);

  return cardCol;
}

function displayCards(dataArray) {
  bikeCards.innerHTML = "";
  dataArray.forEach((element) => {
    const newCard = renderCard(element);
    bikeCards.append(newCard);
  });
}

allFilters.forEach((filter) => {
  filter.addEventListener("click", (e) => {
    e.preventDefault();

    allFilters.forEach((f) => f.classList.remove("active-filter"));
    e.currentTarget.classList.add("active-filter");

    const id = e.currentTarget.id;
    let filtered = [];

    if (id === "all") {
      filtered = bikes;
    } else if (id.startsWith("gender-")) {
      const gender = id.split("-")[1].toUpperCase();
      filtered = bikes.filter((bike) => bike.gender === gender);
    } else {
      brand = id.replaceAll("-", " ").toUpperCase();
      filtered = bikes.filter(
        (bike) => bike.brand.replaceAll("-", " ") === brand
      );
    }
    displayCards(filtered);
    if (window.innerWidth <= 768) {
      filterSection.classList.remove("filter-visible");
    }
  });
});

function updateBagdes() {
  allFilters.forEach((filter) => {
    const badge = filter.querySelector(".badge");
    console.log(badge);
    let categoryItemsNumber = 0;

    let filtered = [];
    const id = filter.id;

    if (id === "all") {
      filtered = bikes;
    } else if (id.startsWith("gender-")) {
      const gender = id.split("-")[1].toUpperCase();
      filtered = bikes.filter((bike) => bike.gender === gender);
    } else {
      brand = id.replaceAll("-", " ").toUpperCase();
      filtered = bikes.filter(
        (bike) => bike.brand.replaceAll("-", " ") === brand
      );
    }

    categoryItemsNumber = filtered.length;

    if (badge) {
      badge.textContent = categoryItemsNumber;
    }
  });
}
