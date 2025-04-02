document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/cities")
        .then(response => response.json())
        .then(cities => {
            populateMainCards(cities);
        })
        .catch(error => console.error("Error fetching cities:", error));
});

function populateMainCards(cities) {
    const mainCardsContainer = document.getElementById("main-cards");
    mainCardsContainer.innerHTML = "";

    cities.forEach(city => {
        let placeholderUrl;
        if (!city.imageUrl){
            fetch("https://dog.ceo/api/breeds/image/random")
                .then(response => response.json())
                .then(data => {
                    placeholderUrl = data.message;
                })
        }

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="${city.imageUrl ? city.imageUrl : placeholderUrl}" class="card-img-top" alt="${city.name}">
            <div class="card-body">
                <h3>${city.name}</h3>
            </div>
        `;
        card.addEventListener("click", () => loadCityDetails(city.id));
        mainCardsContainer.appendChild(card);
    });
}

function loadCityDetails(cityId) {
    fetch(`http://localhost:3000/cities/${cityId}/places`)
        .then(response => response.json())
        .then(places => {
            populateCityDetails(places);
        })
        .catch(error => console.error("Error fetching city details:", error));

}