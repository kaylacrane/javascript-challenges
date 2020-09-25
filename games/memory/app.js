document.addEventListener("DOMContentLoaded", () => {
  //card options
  const cardArray = [
    { name: "frog", img: "images/frog.jpg" },
    { name: "frog", img: "images/frog.jpg" },
    { name: "bear", img: "images/bear.jpg" },
    { name: "bear", img: "images/bear.jpg" },
    { name: "pig", img: "images/pig.jpg" },
    { name: "pig", img: "images/pig.jpg" },
    { name: "tiger", img: "images/tiger.jpg" },
    { name: "tiger", img: "images/tiger.jpg" },
    { name: "chicken", img: "images/chicken.jpg" },
    { name: "chicken", img: "images/chicken.jpg" },
    { name: "koala", img: "images/koala.jpg" },
    { name: "koala", img: "images/koala.jpg" },
    { name: "dog", img: "images/dog.jpg" },
    { name: "dog", img: "images/dog.jpg" },
    { name: "monkey", img: "images/monkey.jpg" },
    { name: "monkey", img: "images/monkey.jpg" },
    { name: "panda", img: "images/panda.jpg" },
    { name: "panda", img: "images/panda.jpg" },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const alert = document.querySelector(".alert");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  const audioMatch = new Audio("./sounds/coin.wav");
  const audioMiss = new Audio("./sounds/error.wav");
  const newGame = document.querySelector(".new-game");

  newGame.addEventListener("click", createNewGame);
  function createNewGame() {
    cardsWon = [];
    grid.innerHTML = "";
    createBoard();
  }

  //create gameboard
  function createBoard() {
    resultDisplay.textContent = "0";
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "images/background-yellow-waves.jpg");
      card.setAttribute("data-id", i);
      card.classList.add("card");
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }
  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 200);
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];
    if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
      audioMatch.play();
      displayAlert("match");
      cards[optionOneId].setAttribute("src", "images/blank.jpg");
      cards[optionOneId].style.pointerEvents = "none";
      cards[optionTwoId].style.pointerEvents = "none";
      cards[optionTwoId].setAttribute("src", "images/blank.jpg");
      cards[optionOneId].classList.add("matched-card");
      cards[optionTwoId].classList.add("matched-card");

      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute(
        "src",
        "images/background-yellow-waves.jpg"
      );
      cards[optionTwoId].setAttribute(
        "src",
        "images/background-yellow-waves.jpg"
      );
      audioMiss.play();
      displayAlert("miss");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      grid.innerHTML = "";
      alert.innerHTML = `<span class="won"> You won!</span>`;
    }
  }

  function displayAlert(action) {
    alert.classList.add(`alert-${action}`);
    if (action === "miss") {
      alert.innerHTML = `<i class="fas fa-times"></i>`;
    } else if (action === "match") {
      alert.innerHTML = `<i class="fas fa-check"></i>`;
    }

    //remove alert
    setTimeout(function () {
      alert.innerHTML = "";
      alert.classList.remove(`alert-${action}`);
    }, 1000);
  }

  createBoard();
});
