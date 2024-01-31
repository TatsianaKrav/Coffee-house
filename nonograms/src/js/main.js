import { easy, medium, hard } from "./data.js";
import {
  checkGameEnd,
  createModal,
  closeModal,
  calculateClues,
  showTimer,
  initTimer,
  showSolution,
  saveGame,
  continueGame,
} from "./utils.js";

const bodyElem = document.body;
const containerElem = document.createElement("div");
containerElem.classList.add("container");
bodyElem.appendChild(containerElem);

const gameElem = document.createElement("div");
gameElem.classList.add("game");

const gameName = document.createElement("div");
gameName.classList.add("game-name");

let nonograms = easy;
let nonogram = nonograms[0];
let timerOn = false;
let interval = {};
let level = "easy";
/* const tableId = Math.floor(1 + Math.random() * 5); */
/* let firstNonogram = nonograms.find((item) => item.id === tableId); */
/* let firstNonogram = nonograms[0]; */

showActions();
showField(nonogram);

function showActions() {
  //btn save game
  //btn continue game
  //theme
  //table

  const actionsElem = document.createElement("div");
  actionsElem.classList.add("actions");

  const menuElem = document.createElement("div");
  menuElem.classList.add("menu");
  actionsElem.appendChild(menuElem);

  const levelElem = document.createElement("select");
  levelElem.classList.add("level");
  menuElem.appendChild(levelElem);

  for (let i = 0; i < 3; i++) {
    const levelChoiceElem = document.createElement("option");

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

  const gameMenuElem = document.createElement("select");
  gameMenuElem.classList.add("game-choice");
  menuElem.appendChild(gameMenuElem);

  randomGame(actionsElem);

  const solutionBtn = document.createElement("button");
  solutionBtn.classList.add("solution");
  solutionBtn.classList.add("btn");
  solutionBtn.innerText = "Solution";
  actionsElem.appendChild(solutionBtn);

  const saveGameBtn = document.createElement("button");
  saveGameBtn.classList.add("save");
  saveGameBtn.classList.add("btn");
  saveGameBtn.innerText = "Save game";
  actionsElem.appendChild(saveGameBtn);

  saveGameBtn.onclick = () => {
    saveGame(nonogram);
  };

  const continueGameBtn = document.createElement("button");
  continueGameBtn.classList.add("continue");
  continueGameBtn.classList.add("btn");
  continueGameBtn.innerText = "Continue last game";
  actionsElem.appendChild(continueGameBtn);

  continueGameBtn.onclick = () => {
    continueGame(showField);
  };

  showGameChoice(gameMenuElem);
  chooseLevel(gameMenuElem);
  chooseGame(nonograms);
}

function showGameChoice(gameMenuElem) {
  const options = document.querySelectorAll(".game-choice-option");
  if (options.length > 0) {
    const parent = options[0].parentNode;

    options.forEach((item) => {
      parent.removeChild(item);
    });
  }

  for (let i = 0; i < nonograms.length; i++) {
    const gameMenuOption = document.createElement("option");
    gameMenuOption.innerText = nonograms[i].name;
    gameMenuOption.classList.add("game-choice-option");
    gameMenuOption.setAttribute("value", nonograms[i].name);
    gameMenuElem.appendChild(gameMenuOption);
  }
}

function chooseGame(nonograms) {
  const chosenGameSelector = document.querySelector(".game-choice");

  chosenGameSelector.onchange = (e) => {
    const chosenGame = e.target.value;

    nonogram = nonograms.find((item) => item.name === chosenGame);
    showField(nonogram);
  };
}

function chooseLevel(gameMenuElem) {
  const levelElem = document.querySelector(".level");

  levelElem.onchange = (e) => {
    level = e.target.value;

    nonograms = getLevel();
    showGameChoice(gameMenuElem);

    const defaultGame =
      document.querySelector(".game-choice").childNodes[0].value;
    const defaultNonogram = nonograms.find((item) => item.name === defaultGame);
    nonogram = defaultNonogram;

    showField(nonogram);

    chooseGame(nonograms);
  };
}

function randomGame(actionsElem) {
  const randomBtn = document.createElement("button");
  randomBtn.classList.add("random");
  randomBtn.classList.add("btn");
  randomBtn.innerText = "Random game";

  actionsElem.appendChild(randomBtn);

  const allGames = easy.concat(medium).concat(hard);

  randomBtn.onclick = () => {
    let random = Math.floor(Math.random() * allGames.length);
    let randomGame = allGames[random];

    gameElem.innerHTML = "";
    clearInterval(interval);
    timerOn = false;
    showField(randomGame);
  };
}

function getLevel() {
  switch (level) {
    case "easy":
      nonograms = easy;
      break;
    case "medium":
      nonograms = medium;
      break;
    case "hard":
      nonograms = hard;
      break;
    default:
      [];
  }

  return nonograms;
}

function showField(nonogram) {
  gameElem.innerHTML = "";
  const tableElem = document.createElement("table");

  gameName.innerText = nonogram.name;
  const topClues = nonogram.topClues;
  const leftClues = nonogram.leftClues;

  const [topCluesMaxCount, leftCluesMaxCount] = calculateClues(nonogram);

  //localStorage проверка на пройденный кроссворд

  for (let i = 0; i <= nonogram.image.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j <= nonogram.image.length; j++) {
      const col = document.createElement("td");

      if (i === 0 && j === 0) {
        col.classList.add("empty");
      } else if ((i === 0) & (j !== 0)) {
        col.classList.add("top-cell");

        for (let l = 0; l < topCluesMaxCount; l++) {
          const divElem = document.createElement("div");
          divElem.classList.add("top");
          col.insertBefore(divElem, col.firstChild);

          if (topClues[j - 1][l]) {
            divElem.innerText = topClues[j - 1][l];
          }
        }
      } else if (i !== 0 && j === 0) {
        col.classList.add("left-cell");

        for (let l = 0; l < leftCluesMaxCount; l++) {
          const divElem = document.createElement("div");
          divElem.classList.add("left");
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
  showTimer(gameElem);
  gameElem.appendChild(tableElem);

  fillCell();
  resetGame();
  showSolution(nonogram);
}

function resetGame() {
  const resetBtn = document.createElement("button");
  resetBtn.classList.add("reset");
  resetBtn.innerText = "Reset game";

  const gameElem = document.querySelector(".game");
  gameElem.appendChild(resetBtn);

  resetBtn.onclick = () => {
    const cells = document.querySelectorAll(
      "td:not(.left-cell):not(.top-cell)"
    );

    Array.from(cells).forEach((cell) => {
      cell.style.backgroundColor = "transparent";
      cell.removeAttribute("filled");
      cell.classList.remove("not");
      cell.setAttribute("not", "null");
    });
  };
}

function fillCell() {
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
        interval = initTimer(0, 0);
        timerOn = true;
      }

      if (item.getAttribute("not") === "x") {
        return false;
      }
      if (!item.getAttribute("filled")) {
        item.style.backgroundColor = "black"; // или добавить класс
        item.setAttribute("filled", "true");
        fillSound.play();
      } else if (item.getAttribute("filled")) {
        item.style.backgroundColor = "transparent"; // или добавить класс
        item.removeAttribute("filled");
        removeSound.play();
      }

      checkGameEnd(nonogram, newGame);
    };

    item.addEventListener("contextmenu", (e) => {
      e.preventDefault();

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
}

function newGame() {
  gameElem.innerHTML = "";
  const modal = document.querySelector(".modal");
  modal.classList.remove("show");
  clearInterval(interval);
  timerOn = false;
  showField(nonogram);
}
