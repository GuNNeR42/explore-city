document.addEventListener("DOMContentLoaded", function () {
    // fetchCities(0, 3);
    fetchRandomCities(3);
});

function fetchCities(start, count) {
    fetch(`http://localhost:3000/cities?start=${start}&count=${count}`)
        .then(response => response.json())
        .then(cities => {
            populateMainCards(cities);
        })
        .catch(error => console.error("Error fetching cities:", error));
}

function fetchRandomCities(count) {
    fetch(`http://localhost:3000/cities/random?count=${count}`)
        .then(response => response.json())
        .then(async cities => {
            await populateMainCards(cities);
        })
        .catch(error => console.error("Error fetching cities:", error));
}

async function populateMainCards(cities) {
    const mainCardsContainer = document.getElementById("main-cards");
    mainCardsContainer.innerHTML = "";

    for (const city of cities) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${city.imageUrl ? city.imageUrl : await getPlaceholderImageUrl()}" class="card-img-top" alt="${city.name}">
            <div class="card-body">
                <h3>${city.name}</h3>
            </div>
        `;
        card.addEventListener("click", () => loadCityDetails(city));
        mainCardsContainer.appendChild(card);
    }
}

function loadCityDetails(city) {
    fetch(`http://localhost:3000/cities/${city.id}/places`)
        .then(response => response.json())
        .then(async places => {
            await populateCityPlaces(places, city.name);
        })
        .catch(error => console.error("Error fetching city details:", error));
}

async function getPlaceholderImageUrl() {
    let url;
    await fetch("https://dog.ceo/api/breeds/image/random")
        .then(response => response.json())
        .then(data => {
            url = data.message;
        });
    return url;
}

async function populateCityPlaces(places, cityName) {
    const cityPlaceContainer = document.getElementById("city-places");
    cityPlaceContainer.innerHTML = "";
    document.querySelector("#city-details h4").innerText = cityName;

    for (const place of places) {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `            
            <img src="${place.imageUrl ? place.imageUrl : await getPlaceholderImageUrl()}" class="card-img-top" alt="${place.name}">
            <div class="card-body">
                <h5>${place.name}</h5>
                <h6>${reformatPlaceTypeString(place.type)}</h6>
            </div>
        `;
        card.addEventListener("click", () => openPlaceDetail(place.id));
        cityPlaceContainer.appendChild(card);
    }
    document.getElementById("city-details").classList.remove("hidden");
}

function reformatPlaceTypeString(place) {
    const foo =  place.replace(/_/g, " ");
    return foo.charAt(0).toUpperCase() + foo.slice(1).toLowerCase();
}

function openPlaceDetail(placeId){
    window.open(`place-detail.html?placeId=${placeId}`, "_blank");
}
