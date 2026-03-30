// This changes the title of your site

var sitename = "Toastie's Games"; // Change this to change the name of your website.
var subtext = "v1.2"; // set the subtext

// more settings in main.css



// END CONFIG
// DO NOT MODIFY IF YOU DO NOT KNOW WHAT YOUR DOING!

import "/./config/custom.js";

var serverUrl1 = "https://gms.parcoil.com";
var currentPageTitle = document.title;
document.title = `${currentPageTitle} | ${sitename}`;
let gamesData = []; 

function displayFilteredGames(filteredGames) {
  const gamesContainer = document.getElementById("gamesContainer");
  gamesContainer.innerHTML = ""; 

  filteredGames.forEach((game) => {
    const gameDiv = document.createElement("div");
    gameDiv.classList.add("game");

    const gameImage = document.createElement("img");
    gameImage.src = `${serverUrl1}/${game.url}/${game.image}`;
    gameImage.alt = game.name;
    gameImage.onclick = () => {
      window.location.href = `play.html?gameurl=${game.url}/`;
    };

    const gameName = document.createElement("p");
    gameName.textContent = game.name;

    gameDiv.appendChild(gameImage);
    gameDiv.appendChild(gameName);
    gamesContainer.appendChild(gameDiv);
  });
}


function handleSearchInput() {
  const searchInput = document.getElementById("searchInput");
  if (!searchInput) return;

  const searchInputValue = searchInput.value.toLowerCase();
  const filteredGames = gamesData.filter((game) =>
    game.name.toLowerCase().includes(searchInputValue)
  );
  displayFilteredGames(filteredGames);
}

function initialize() {
  const titleEl = document.getElementById("title");
  const subtitleEl = document.getElementById("subtitle");
  const searchInput = document.getElementById("searchInput");

  if (titleEl) titleEl.textContent = sitename;
  if (subtitleEl) subtitleEl.textContent = subtext;
  if (searchInput) searchInput.addEventListener("input", handleSearchInput);

  fetch("./config/games.json")
    .then((response) => response.json())
    .then((data) => {
      gamesData = data;
      displayFilteredGames(data);
    })
    .catch((error) => console.error("Error fetching games:", error));
}

document.addEventListener("DOMContentLoaded", initialize);
