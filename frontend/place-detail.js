document.addEventListener("DOMContentLoaded", function(){
    fetchPlaceData();
})

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch multiple endpoints in parallel
async function fetchPlaceData() {
    const placeId = getQueryParam("placeId");
    if (!placeId) {
        console.log("Place ID not found!");
        return;
    }

    const urls = {
        placeDetails: `http://localhost:3000/places/${placeId}`,
        comments: `http://localhost:3000/places/${placeId}/comments`,
        ratings: `http://localhost:3000/places/${placeId}/ratings`,
        avgRating: `http://localhost:3000/places/${placeId}/ratings/avg`
    };

    try {
        // Fetch all data asynchronously
        const [placeRes, commentsRes, ratingsRes, avgRatingRes] = await Promise.all([
            fetch(urls.placeDetails),
            fetch(urls.comments),
            fetch(urls.ratings),
            fetch(urls.avgRating)
        ]);

        // Convert responses to JSON
        const [place, comments, ratings, avgRating] = await Promise.all([
            placeRes.json(),
            commentsRes.json(),
            ratingsRes.json(),
            avgRatingRes.json()
        ]);

        console.log(place, comments, ratings, avgRating);

        // Populate UI
        // document.getElementById("place-info").innerHTML = `<strong>${place.name}</strong><br>${place.description}`;
        // document.getElementById("avg-rating").innerText = avgRating.average || "No ratings yet";
        //
        // // Populate Comments
        // const commentsList = document.getElementById("comments-list");
        // commentsList.innerHTML = comments.length
        //     ? comments.map(c => `<li>${c.user}: ${c.comment}</li>`).join("")
        //     : "<li>No comments yet.</li>";
        //
        // // Populate Ratings
        // const ratingsList = document.getElementById("ratings-list");
        // ratingsList.innerHTML = ratings.length
        //     ? ratings.map(r => `<li>${r.user}: ${r.rating} ⭐</li>`).join("")
        //     : "<li>No ratings yet.</li>";

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("place-info").innerText = "Error loading place details!";
    }
}

function populateComments(comments){
    comments.forEach(c => {

    })
}