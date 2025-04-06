const placeId = getQueryParam("placeId");

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("comment-form").addEventListener("submit", event => {
        event.preventDefault();
        sendNewComment();
    });
    document.getElementById("delete-place-button").addEventListener("click", event => {
        event.preventDefault();
        deletePlace();
    });

    fetchPlaceData();

})

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch multiple endpoints in parallel
async function fetchPlaceData() {
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
        populatePlaceDetails(place, ratings.length, avgRating);
        populateComments(comments);

    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById("place-info").innerText = "Error loading place details!";
    }
}

function populatePlaceDetails(place, ratingsCount, avgRating) {
    document.title = `${place.name}`;
    document.getElementById("name").innerText = place.name;

    let ratingText = `${avgRating}/5 `;
    ratingText += "⭐️️️".repeat(Math.round(avgRating));
    ratingText += ` (${ratingsCount})`;
    document.getElementById("rating").innerHTML = ratingText;

    document.getElementById("address").innerHTML = place.displayed_address;
    document.getElementById("description").innerHTML = place.description;
}

function populateComments(comments){
    const container = document.getElementById("comments-container");
    container.innerHTML = "";
    comments.forEach(c => {
        const comment = document.createElement("div");
        comment.className = "comment";

        comment.innerHTML = `
        <div class="comment-header">
          <h5>👤 ${c.username}</h5>
          <span>${new Date(c.created_at).toLocaleString("cs-CZ")}</span>
          <span class="delete">🗑️</span>
        </div>
        <p class="comment-body">
          ${c.value}
        </p>
        `;
        container.appendChild(comment);
        container.querySelector(".delete").addEventListener("click", () => {deleteComment(c.id)});
    })
}


function sendNewComment() {
    const sender = document.getElementById("form-comment-name").value;
    const value = document.getElementById("form-comment-body").value;

    const body = {
        username: sender.toString(),
        value: value.toString(),
    }

    fetch(`http://localhost:3000/places/${placeId}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
            location.reload();
        }
    })
}

function deletePlace() {
    fetch(`http://localhost:3000/places/${placeId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            window.location.href = ("index.html");
        }
    });
}

function deleteComment(commentId) {
    fetch(`http://localhost:3000/comments/${commentId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.status >= 200 && response.status < 300) {
            location.reload();
        }
    })
}