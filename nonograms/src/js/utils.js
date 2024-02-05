import { easy, medium, hard } from "./data.js";

let sec = 0;
let min = 0;
let isPaused = false;
let timer = {};
let scores = [];

export function createElement(node, name) {
  const elem = document.createElement(node);
  elem.classList.add(name);

  return elem;
}

export function getLevel(level) {
  let nonograms = [];

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

export function checkGameEnd(nonogram, cb) {
  let currentGameFilledCells = 0;
  const currentGameCells = document.querySelectorAll(
    "td:not(.left-cell):not(.top-cell)"
  );

  Array.from(currentGameCells).forEach((item) => {
    if (item.getAttribute("filled")) {
      currentGameFilledCells++;
    }
  });

  const nonogramFilledCells = nonogram.image
    .flat()
    .filter((item) => item === 1).length;

  if (currentGameFilledCells === nonogramFilledCells) {
    const result = checkResult(nonogram);

    if (result) {
      createModal(nonogram, cb);
      const modal = document.querySelector(".modal");

      const timer = document.getElementById("timer");
      let timerInSec = calculateTimer(timer.innerText);
      const messageElem = document.querySelector(".message");
      messageElem.innerText =
        "Great! You have solved the nonogram in " + timerInSec + " seconds!";

      setTimeout(() => {
        modal.classList.add("show");
      }, 700);

      const gameTimeResult = {
        game: nonogram,
        time: document.querySelector("#timer").innerText,
      };

      checkScoreTable(gameTimeResult);
    }
  }
}

function checkResult(nonogram) {
  const currentGameCells = document.querySelectorAll(
    "td:not(.left-cell):not(.top-cell):not(.empty)"
  );

  const gameAnswers = String(nonogram.image.flat()).split(",").join("");

  let stringResult = "";

  Array.from(currentGameCells).forEach((item) => {
    if (item.getAttribute("filled")) {
      stringResult += "1";
    } else {
      stringResult += "0";
    }
  });

  return gameAnswers === stringResult;
}

export function createModal(nonogram, cb) {
  const containerElem = document.querySelector(".container");
  const winSound = document.createElement("audio");
  winSound.setAttribute("src", "assets/sounds/win.mp3");
  containerElem.appendChild(winSound);

  winSound.play();

  const timer = document.getElementById("timer");
  let timerInSec = calculateTimer(timer.innerText);

  const modalElem = createElement("div", "modal");

  const modalWindowElem = createElement("div", "modal-window");

  const messageElem = createElement("div", "message");

  const closeElem = createElement("div", "close");

  modalWindowElem.appendChild(messageElem);
  modalWindowElem.appendChild(closeElem);

  modalElem.appendChild(modalWindowElem);
  containerElem.appendChild(modalElem);

  const checkbox = document.getElementById("checkbox");

  if (checkbox.checked) {
    modalWindowElem.classList.add("dark");
  } else {
    modalWindowElem.classList.remove("dark");
  }

  closeModal(nonogram, cb);
}

function calculateTimer(time) {
  let minStr = time.slice(0, 2);
  let secStr = time.slice(3, 5);

  let min = Number(minStr);
  let sec = Number(secStr);

  min = min > 0 ? min * 60 : min;
  return min + sec;
}

function closeModal(nonogram, cb) {
  const closeModalElem = document.querySelector(".close");
  let nonograms = [];

  switch (nonogram.level) {
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

  let currentGameId = nonogram.id;

  let random = Math.floor(Math.random() * 5);
  while (currentGameId === random + 1) {
    random = Math.floor(Math.random() * 5);
  }

  if (closeModalElem) {
    closeModalElem.onclick = () => {
      cb(nonograms[random]);
    };
  }
}

export function calculateClues(nonogram) {
  let maxTop = 0;
  let maxLeft = 0;

  nonogram.topClues.forEach((item) => {
    maxTop = item.length > maxTop ? item.length : maxTop;
  });

  nonogram.leftClues.forEach((item) => {
    maxLeft = item.length > maxLeft ? item.length : maxLeft;
  });

  return [maxTop, maxLeft];
}

export function initTimer(first, second, game) {
  isPaused = false;
  sec = second;
  min = first;

  if (localStorage.getItem("savedGame")) {
    const savedGame = JSON.parse(localStorage.getItem("savedGame")).currentGame;
    const time = JSON.parse(localStorage.getItem("savedGame")).timer;

    let savedMin = 0;
    let savedSec = 0;

    savedMin = time.slice(0, 2);
    savedSec = time.slice(3, 5);
    if (savedMin[0] === "0") {
      savedMin = savedMin.slice(1);
    }
    if (savedSec[0] === "0") {
      savedSec = savedSec.slice(1);
    }

    if (savedGame.name === game.name) {
      min = min + Number(savedMin);
      sec = sec + Number(savedSec);
    }
  }

  timer = setInterval(tick, 1000);
  return timer;
}

export function tick() {
  const modal = document.querySelector(".modal.show");

  if (!isPaused) {
    isPaused = modal ? true : false;
  }

  if (isPaused) return false;

  const timer = document.getElementById("timer");
  sec++;

  if (sec >= 60) {
    min++;
    sec = 0;
  }

  if (sec < 10) {
    if (min < 10) {
      timer.innerText = `0${min}:0${sec}`;
    } else {
      timer.innerText = `${min}:0${sec}`;
    }
  } else {
    if (min < 10) {
      timer.innerText = `0${min}:${sec}`;
    } else {
      timer.innerText = `${min}:${sec}`;
    }
  }
}

export function showTimer() {
  const gameElem = document.querySelector(".game");
  const timerElem = document.createElement("div");
  timerElem.setAttribute("id", "timer");
  timerElem.innerText = "00:00";
  gameElem.appendChild(timerElem);
}

export function showSolution(nonogram) {
  const solutionBtn = document.querySelector(".solution");
  const gameAnswers = String(nonogram.image.flat()).split(",").join("");

  solutionBtn.onclick = () => {
    const cells = document.querySelectorAll(
      "td:not(.left-cell):not(.top-cell):not(.empty)"
    );

    for (let i = 0; i < cells.length; i++) {
      if (gameAnswers[i] === "0" && cells[i].getAttribute("filled")) {
        cells[i].classList.remove("filled");
        cells[i].removeAttribute("filled");
      }

      if (gameAnswers[i] === "1" && cells[i].getAttribute("filled") === null) {
        cells[i].classList.add("filled");
        cells[i].setAttribute("filled", "true");
      }

      if (cells[i].getAttribute("not") === "x") {
        cells[i].classList.remove("not");
      }
    }
  };
}

export function saveGame(nonogram, cb, newNonogram) {
  const cells = document.querySelectorAll(
    "td:not(.left-cell):not(.top-cell):not(.empty)"
  );
  const savedGame = [];

  cells.forEach((item, index) => {
    if (item.getAttribute("filled")) {
      savedGame[index] = "1";
    } else if (item.getAttribute("not") === "x") {
      savedGame[index] = "x";
    } else {
      savedGame[index] = "0";
    }
  });

  const time = document.getElementById("timer").innerText;

  const toSave = {
    currentGame: nonogram,
    savedGame: savedGame,
    timer: time,
  };

  localStorage.setItem("savedGame", JSON.stringify(toSave));
  isPaused = true;

  cb(newNonogram);
}

export function continueGame(cb) {
  const currentGame = JSON.parse(localStorage.getItem("savedGame")).currentGame;
  const savedGame = JSON.parse(localStorage.getItem("savedGame")).savedGame;
  const timer = JSON.parse(localStorage.getItem("savedGame")).timer;

  cb(currentGame);
  document.getElementById("timer").innerText = timer;
  min = timer.slice(0, 2);
  sec = timer.slice(3, 5);
  if (min[0] === "0") {
    min = min.slice(1);
  }
  if (sec[0] === "0") {
    sec = sec.slice(1);
  }

  const cells = document.querySelectorAll(
    "td:not(.left-cell):not(.top-cell):not(.empty)"
  );

  savedGame.forEach((item, index) => {
    if (item === "1") {
      cells[index].classList.add("filled");
      cells[index].setAttribute("filled", "true");
    } else if (item === "x") {
      cells[index].classList.add("not");
      cells[index].setAttribute("not", "x");
    }
  });
}

export function crossClues(clues, soundOn, soundOff) {
  clues.forEach((item) => {
    item.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      if (item.getAttribute("not") === "x") {
        item.classList.remove("not");
        item.setAttribute("not", "null");
        soundOff.play();
      } else {
        item.classList.add("not");
        item.setAttribute("not", "x");
        soundOn.play();
      }
    });
  });
}

export function burgerHandler() {
  const burger = document.querySelector(".burger");

  if (burger) {
    burger.onclick = () => {
      const actionsElem = document.querySelector(".actions");
      actionsElem.classList.add("open");
      closeMenu();
    };
  }
}

function closeMenu() {
  const actionsElems = document.querySelectorAll(
    "#actions .btn, .burger-close"
  );
  Array.from(actionsElems).forEach((item) => {
    item.addEventListener("click", () => {
      document.getElementById("actions").classList.remove("open");
    });
  });

  const gameMenuElem = document.querySelector(".game-choice");
  gameMenuElem.addEventListener("change", () => {
    document.getElementById("actions").classList.remove("open");
  });
}

export function showThemeBtn() {
  const actionsElem = document.querySelector(".actions");

  const themeElem = createElement("div", "theme");
  const themeChoice = createElement("div", "theme-choice");
  const spanLight = createElement("span", "light");
  spanLight.innerText = "Light theme";
  const spanDark = createElement("span", "dark");
  spanDark.innerText = "Dark theme";
  themeChoice.appendChild(spanLight);
  themeChoice.appendChild(spanDark);
  const checkboxWrap = createElement("div", "wrapper");
  const themeLabel = createElement("label", "label");
  themeLabel.setAttribute("for", "checkbox");
  themeElem.appendChild(themeChoice);
  checkboxWrap.appendChild(themeLabel);
  themeElem.appendChild(checkboxWrap);
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", "checkbox");
  themeLabel.appendChild(checkbox);

  const spanInner = createElement("span", "span-inner");
  themeLabel.appendChild(spanInner);

  actionsElem.appendChild(themeElem);
}

export function chooseTheme() {
  const themeCheckbox = document.getElementById("checkbox");
  const elemsToChangeColor = document.querySelectorAll(
    "body, .table, td, select, .btn"
  );

  function checkTheme() {
    if (themeCheckbox.checked) {
      elemsToChangeColor.forEach((elem) => {
        elem.classList.add("dark");
      });
    } else {
      elemsToChangeColor.forEach((elem) => {
        elem.classList.remove("dark");
      });
    }
  }

  checkTheme();

  themeCheckbox.addEventListener("change", checkTheme);
}

export function createScoreTable() {
  const actionsElem = document.getElementById("actions");
  const highScoreTable = createElement("div", "high-score-table");
  const tableName = createElement("div", "table-name");
  tableName.innerText = "High score table";

  const scoreTableElem = createElement("div", "score-table");
  const headers = createElement("div", "headers");

  for (let i = 0; i < 4; i++) {
    const tdElem = createElement("div", "head");

    switch (i) {
      case 1:
        tdElem.innerText = "Game";
        break;
      case 2:
        tdElem.innerText = "Level";
        break;
      case 3:
        tdElem.innerText = "Time";
        break;
      default:
        "";
    }

    headers.appendChild(tdElem);
  }

  scoreTableElem.appendChild(headers);
  highScoreTable.appendChild(tableName);
  highScoreTable.appendChild(scoreTableElem);
  actionsElem.appendChild(highScoreTable);
}

/* export function createScoreTable() {
  const actionsElem = document.getElementById("actions");
  const tableName = createElement("div", "table-name");
  tableName.innerText = "High score table";

  const scoreTableElem = createElement("table", "score-table");
  const theadElem = document.createElement("thead");
  const tbodyElem = document.createElement("tbody");

  const headers = document.createElement("tr");

  for (let i = 0; i < 4; i++) {
    const tdElem = document.createElement("td");

    switch (i) {
      case 1:
        tdElem.innerText = "Game";
        break;
      case 2:
        tdElem.innerText = "Level";
        break;
      case 3:
        tdElem.innerText = "Time";
        break;
      default:
        "";
    }

    headers.appendChild(tdElem);
  }

  theadElem.appendChild(headers); */

/*  for (let i = 0; i < 5; i++) {
    const trElem = document.createElement("tr");

    for (let j = 0; j < 4; j++) {
      const tdElem = document.createElement("td");

      if (j === 0) {
        tdElem.innerText = i + 1;
      } else if (j === 1) {
        tdElem.innerText = game.game;
      } else if (j === 2) {
        tdElem.innerText = game.game.level;
      } else if (j === 3) {
        tdElem.innerText = game.time;
      }
      trElem.appendChild(tdElem);
    }

    tbodyElem.appendChild(trElem);
  } */

/*  scoreTableElem.appendChild(theadElem);
  scoreTableElem.appendChild(tbodyElem);
  actionsElem.appendChild(tableName);
  actionsElem.appendChild(scoreTableElem);
} */

export function checkScoreTable(game) {
  const scoreTableElem = document.querySelector(".score-table");

  const cols = document.querySelectorAll(".col");

  if (cols.length > 0) {
    let sameGame = Array.from(cols).find(
      (item) => item.innerText === game.game.name
    );

    if (sameGame) {
      const prevTime = sameGame.nextElementSibling.nextElementSibling.innerText;

      if (calculateTimer(prevTime) > calculateTimer(game.time)) {
        sameGame.nextElementSibling.nextElementSibling.innerText = game.time;

        const gameInScores = scores.find(
          (item) => item.game.name === game.game.name
        );
        gameInScores.time = game.time;
      }

      filterScore(scores);
      return false;
    }
  }

  if (scores.length < 5) {
    scores.push(game);
    const row = createElement("div", "row");
    let index = scores.indexOf(game);
    let item = scores[index];

    for (let i = 0; i < 4; i++) {
      const col = createElement("div", "col");
      if (i === 0) {
        col.innerText = index + 1;
      } else if (i === 1) {
        col.innerText = item.game.name;
      } else if (i === 2) {
        col.innerText = item.game.level;
      } else if (i === 3) {
        col.innerText = item.time;
      }

      row.appendChild(col);
    }
    scoreTableElem.appendChild(row);
  } else {
    checkScore(scores, game);
  }

  filterScore(scores);
}

function checkScore(arr, game) {
  let longestTime = 0;
  let longestGame = {};

  arr.forEach((item) => {
    let itemTime = calculateTimer(item.time);
    if (itemTime > longestTime) {
      longestTime = itemTime;
      longestGame = item;
    }
  });

  let gameTime = calculateTimer(game.time);

  if (longestTime > gameTime) {
    let index = arr.indexOf(longestGame);
    arr[index] = game;

    const rows = document.querySelectorAll(".row");
    const rowsChildren = rows[index].children;
    Array.from(rowsChildren).forEach((item, index) => {
      if (index === 1) {
        item.innerText = game.game.name;
      } else if (index === 2) {
        item.innerText = game.game.level;
      } else if (index === 3) {
        item.innerText = game.time;
      }
    });
    filterScore(scores);
  }
}

function filterScore(arr) {
  let copyArr = Array.from(arr);
  copyArr = copyArr.sort((a, b) => {
    return calculateTimer(a.time) - calculateTimer(b.time);
  });

  const rows = document.querySelectorAll(".row");

  rows.forEach((item, indexRow) => {
    const arrChildren = Array.from(item.children);
    arrChildren.forEach((child, indexCol) => {
      if (indexCol === 1) {
        child.innerText = copyArr[indexRow].game.name;
      } else if (indexCol === 2) {
        child.innerText = copyArr[indexRow].game.level;
      } else if (indexCol === 3) {
        child.innerText = copyArr[indexRow].time;
      }
    });
  });
}
