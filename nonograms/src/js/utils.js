import { easy, medium, hard } from "./data.js";

let sec = 0;
let min = 0;
let isPaused = false;
let timer = {};

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
      setTimeout(() => {
        modal.classList.add("show");
      }, 700);
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
  messageElem.innerText = `Great! You have solved the nonogram in ${timerInSec} seconds!`;
  const closeElem = createElement("div", "close");

  modalWindowElem.appendChild(messageElem);
  modalWindowElem.appendChild(closeElem);

  modalElem.appendChild(modalWindowElem);
  containerElem.appendChild(modalElem);

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
    case 'easy':
      nonograms = easy;
      break;
    case 'medium':
      nonograms = medium;
      break;
    case 'hard':
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

export function initTimer(first, second) {
  isPaused = false;
  sec = second;
  min = first;

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
        cells[i].style.backgroundColor = "transparent";
        cells[i].removeAttribute("filled");
      }

      if (gameAnswers[i] === "1" && cells[i].getAttribute("filled") === null) {
        cells[i].style.backgroundColor = "black";
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
      cells[index].style.backgroundColor = "black";
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
