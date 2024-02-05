import { easy, medium, hard } from "./data.js";
import {
  checkGameEnd,
  calculateClues,
  showTimer,
  initTimer,
  showSolution,
  saveGame,
  continueGame,
  crossClues,
  createElement,
  getLevel,
  burgerHandler,
  showThemeBtn,
  chooseTheme,
  createScoreTable,
} from "./utils.js";

const bodyElem = document.body;
const containerElem = createElement("div", "container");
bodyElem.appendChild(containerElem);

const burgerElem = createElement("div", "burger");
containerElem.appendChild(burgerElem);

const burgerLineTop = createElement("dive", "line");
const burgerLineBottom = createElement("dive", "line");
burgerElem.appendChild(burgerLineTop);
burgerElem.appendChild(burgerLineBottom);

const gameElem = createElement("div", "game");
const gameName = createElement("div", "game-name");

let nonograms = easy;
let nonogram = nonograms[0];
let timerOn = false;
let interval = {};
let level = "easy";

function init() {
  showActions();
  showField(nonogram);
}

init();

function showActions() {
  const actionsElem = createElement("div", "actions");
  actionsElem.setAttribute("id", "actions");

  const closeBurger = createElement("div", "burger-close");
  const closeBurgerLineOne = createElement("div", "burger-close-line");
  const closeBurgerLineTwo = createElement("div", "burger-close-line");
  closeBurger.appendChild(closeBurgerLineOne);
  closeBurger.appendChild(closeBurgerLineTwo);
  actionsElem.appendChild(closeBurger);

  const menuElem = createElement("div", "menu");
  actionsElem.appendChild(menuElem);

  const levelElem = createElement("select", "level");
  menuElem.appendChild(levelElem);

  for (let i = 0; i < 3; i++) {
    const levelChoiceElem = createElement("option", "level-option");

    switch (i) {
      case 0:
        levelChoiceElem.innerText = "Easy";
        levelChoiceElem.setAttribute("value", "easy");
        levelChoiceElem.setAttribute("checked", "true");
        break;
      case 1:
        levelChoiceElem.innerText = "Medium";
        levelChoiceElem.setAttribute("value", "medium");
        break;
      case 2:
        levelChoiceElem.innerText = "Hard";
        levelChoiceElem.setAttribute("value", "hard");
        break;
      default:
        "Игр нет";
    }

    levelElem.appendChild(levelChoiceElem);
    containerElem.appendChild(actionsElem);
  }

  const gameMenuElem = createElement("select", "game-choice");
  menuElem.appendChild(gameMenuElem);

  randomGame();

  const solutionBtn = createElement("button", "btn");
  solutionBtn.classList.add("solution");
  solutionBtn.innerText = "Solution";
  actionsElem.appendChild(solutionBtn);

  const saveGameBtn = createElement("button", "btn");
  saveGameBtn.classList.add("save");
  saveGameBtn.innerText = "Save game";
  actionsElem.appendChild(saveGameBtn);

  let random = Math.floor(Math.random() * 5);

  saveGameBtn.onclick = () => {
    saveGame(nonogram, newGame, nonograms[random]);
  };

  const continueGameBtn = createElement("button", "btn");
  continueGameBtn.classList.add("continue");
  continueGameBtn.innerText = "Continue last game";
  actionsElem.appendChild(continueGameBtn);

  continueGameBtn.onclick = () => {
    continueGame(newGame);
  };

  showThemeBtn();

  showGameChoice();
  chooseLevel();
  chooseGame(nonograms);
  createScoreTable();
  burgerHandler();
}

function showGameChoice() {
  const gameMenuElem = document.querySelector(".game-choice");
  const options = document.querySelectorAll(".game-choice-option");
  if (options.length > 0) {
    const parent = options[0].parentNode;

    options.forEach((item) => {
      parent.removeChild(item);
    });
  }

  for (let i = 0; i < nonograms.length; i++) {
    const gameMenuOption = createElement("option", "game-choice-option");
    gameMenuOption.innerText = nonograms[i].name;
    gameMenuOption.setAttribute("value", nonograms[i].name);
    gameMenuElem.appendChild(gameMenuOption);
  }
}

function chooseGame(nonograms) {
  const chosenGameSelector = document.querySelector(".game-choice");

  chosenGameSelector.onchange = (e) => {
    const chosenGame = e.target.value;

    nonogram = nonograms.find((item) => item.name === chosenGame);
    newGame(nonogram);
  };
}

function chooseLevel() {
  const levelElem = document.querySelector(".level");

  levelElem.onchange = (e) => {
    level = e.target.value;

    nonograms = getLevel(level);
    showGameChoice();

    const defaultGame =
      document.querySelector(".game-choice").childNodes[0].value;
    const defaultNonogram = nonograms.find((item) => item.name === defaultGame);
    nonogram = defaultNonogram;

    chooseGame(nonograms);
    newGame(nonogram);
  };
}

function randomGame() {
  const actionsElem = document.querySelector(".actions");
  const randomBtn = document.createElement("button");
  randomBtn.classList.add("random");
  randomBtn.classList.add("btn");
  randomBtn.innerText = "Random game";

  actionsElem.appendChild(randomBtn);

  const allGames = easy.concat(medium).concat(hard);

  randomBtn.onclick = () => {
    let random = Math.floor(Math.random() * allGames.length);
    let randomGame = allGames[random];
    nonogram = randomGame;

    newGame(nonogram);
  };
}

function showField(nonogram) {
  const tableElem = createElement("table", "table");

  gameName.innerText = nonogram.name;
  const topClues = nonogram.topClues;
  const leftClues = nonogram.leftClues;

  const [topCluesMaxCount, leftCluesMaxCount] = calculateClues(nonogram);

  for (let i = 0; i <= nonogram.image.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j <= nonogram.image.length; j++) {
      const col = document.createElement("td");

      if (i === 0 && j === 0) {
        col.classList.add("empty");
      } else if ((i === 0) & (j !== 0)) {
        col.classList.add("top-cell");

        for (let l = 0; l < topCluesMaxCount; l++) {
          const divElem = createElement("div", "top");
          col.insertBefore(divElem, col.firstChild);

          if (topClues[j - 1][l]) {
            divElem.innerText = topClues[j - 1][l];
          }
        }
      } else if (i !== 0 && j === 0) {
        col.classList.add("left-cell");

        for (let l = 0; l < leftCluesMaxCount; l++) {
          const divElem = createElement("div", "left");
          col.insertBefore(divElem, col.firstChild);

          if (leftClues[i - 1][l]) {
            divElem.innerText = leftClues[i - 1][l];
          }
        }
      } else {
        col.classList.add("cell");
      }

      row.appendChild(col);
    }

    tableElem.appendChild(row);
    containerElem.appendChild(gameElem);
  }

  gameElem.appendChild(gameName);
  showTimer();
  gameElem.appendChild(tableElem);

  const levelOptions = document.querySelectorAll(".level-option");
  const allGames = easy.concat(medium).concat(hard);
  let currentGame = allGames.find((item) => item.name === gameName.innerText);
  let currentLevel = currentGame.level;

  nonograms = getLevel(currentLevel);

  showGameChoice();

  levelOptions.forEach((option) => {
    option.removeAttribute("selected");
    if (option.innerText.toLowerCase() === currentLevel.toLowerCase()) {
      option.setAttribute("selected", "selected");
    }
  });

  const gameChoiceOptions = document.querySelectorAll(".game-choice-option");

  gameChoiceOptions.forEach((option) => {
    option.removeAttribute("selected");
    if (option.innerText === gameName.innerText) {
      option.setAttribute("selected", "selected");
    }
  });

  fillCell(nonogram);
  resetGame();
  showSolution(nonogram);
  chooseTheme();
}

function resetGame() {
  const resetBtn = createElement("button", "reset");
  resetBtn.classList.add("btn");
  resetBtn.innerText = "Reset game";

  const gameElem = document.querySelector(".game");
  gameElem.appendChild(resetBtn);

  resetBtn.onclick = () => {
    const cells = document.querySelectorAll("td, .top, .left");

    Array.from(cells).forEach((cell) => {
      cell.classList.remove("filled");
      cell.removeAttribute("filled");
      cell.classList.remove("not");
      cell.setAttribute("not", "null");
    });
  };
}

function fillCell(nonogram) {
  const fillSound = document.createElement("audio");
  fillSound.setAttribute("src", "assets/sounds/fill.mp3");
  containerElem.appendChild(fillSound);

  const removeSound = document.createElement("audio");
  removeSound.setAttribute("src", "assets/sounds/remove.mp3");
  containerElem.appendChild(removeSound);

  const crossSound = document.createElement("audio");
  crossSound.setAttribute("src", "assets/sounds/cross.mp3");
  containerElem.appendChild(crossSound);

  const cells = document.querySelectorAll(
    "td:not(.left-cell):not(.top-cell):not(.empty)"
  );

  cells.forEach((item) => {
    if (item.classList.contains("left") || item.classList.contains("top")) {
      return false;
    }

    item.onclick = () => {
      if (!timerOn) {
        interval = initTimer(0, 0, nonogram);
        timerOn = true;
      }

      if (item.getAttribute("not") === "x") {
        return false;
      }
      if (!item.getAttribute("filled")) {
        item.classList.add("filled");
        item.setAttribute("filled", "true");
        fillSound.play();
      } else if (item.getAttribute("filled")) {
        item.classList.remove("filled");
        item.removeAttribute("filled");
        removeSound.play();
      }

      checkGameEnd(nonogram, newGame);
    };

    item.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      if (!timerOn) {
        interval = initTimer(0, 0, nonogram);
        timerOn = true;
      }

      if (item.getAttribute("filled")) return false;

      if (item.getAttribute("not") === "x") {
        item.classList.remove("not");
        item.setAttribute("not", "null");
        removeSound.play();
      } else {
        item.classList.add("not");
        item.setAttribute("not", "x");
        crossSound.play();
      }
    });
  });

  const cellsClues = document.querySelectorAll(".top, .left");
  crossClues(cellsClues, removeSound, crossSound);
}

function newGame(nonogram) {
  gameElem.innerHTML = "";
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.classList.remove("show");
  }
  clearInterval(interval);
  interval = {};
  timerOn = false;
  showField(nonogram);
}
