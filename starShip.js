let currentPageUrl = 'https://swapi.dev/api/starships/';

// Toda vez que a página for recarregada
window.onload = async () => {
    try {
        await loadStarships(currentPageUrl);
    } catch (error) {
        console.log(error);
        alert("Loading error");
    }

    const nextButton = document.getElementById("next-button");
    const backButton = document.getElementById("back-button");

    nextButton.addEventListener("click", loadNextPage);
    backButton.addEventListener("click", loadPreviousPage);
};

async function loadStarships(url) {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = ""; // Limpa os resultados anteriores

    try {
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((starships) => {
            const card = document.createElement("div");
            card.style.backgroundImage =
                `url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`;
            card.className = "cards card-starship";

            const starshipNameBG = document.createElement("div");
            starshipNameBG.className = "starship-name-bg";

            const starshipName = document.createElement("span");
            starshipName.className = "starship-name";
            starshipName.innerText = ` ${starships.name}`;

            starshipNameBG.appendChild(starshipName);
            card.appendChild(starshipNameBG);

            card.onclick = () => {
                const modal = document.getElementById("modal");
                modal.style.visibility = "visible";

                const modalContent = document.getElementById("modal-content");
                modalContent.innerHTML = "";

                const starshipImage = document.createElement("div");
                starshipImage.style.backgroundImage = `
                url('https://starwars-visualguide.com/assets/img/starships/${starships.url.replace(/\D/g, "")}.jpg')`;
                starshipImage.className = "starship-image";

                const name = document.createElement("span");
                name.className = "starship-details";
                name.innerText = `Name: ${starships.name}`;

                const cargoCapacity = document.createElement("span");
                cargoCapacity.className = "starship-details";
                cargoCapacity.innerText = `cargo capacity: ${starships.cargo_capacity}`;

                const cost = document.createElement("span");
                cost.className = "starship-details";
                cost.innerText = `cost: ${starships.cost_in_credits}`;

                const length = document.createElement("span");
                length.className = "starship-details";
                length.innerText = `lenght: ${starships.length}`;

                modalContent.appendChild(starshipImage);
                modalContent.appendChild(name);
                modalContent.appendChild(cargoCapacity);
                modalContent.appendChild(cost);
                modalContent.appendChild(length);
                
            }

            mainContent.appendChild(card);
        });

        const nextButton = document.getElementById("next-button");
        const backButton = document.getElementById("back-button");

        nextButton.disabled = !responseJson.next;
        backButton.disabled = !responseJson.previous;

        backButton.style.visibility = responseJson.previous ? "visible" : "hidden";
        nextButton.style.visibility = responseJson.next ? "visible" : "hidden";
        currentPageUrl = url;

    } catch (error) {
        alert("Loading starship error");
        console.log(error);
    }
};

async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarships(responseJson.next);

    } catch (error) {
        console.log(error);
        alert("loading next page error.");
    }
}

async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();

        await loadStarships(responseJson.previous);

    } catch (error) {
        console.log(error);
        alert("loading previous page error.");
    }
}

function hideModal() {
    const modal = document.getElementById("modal");
    modal.style.visibility = "hidden";
}
