let sec = 0;
let min = 0;
let isPaused = false;

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
      const containerElem = document.querySelector(".container");
      createModal(containerElem, cb);
      const modal = document.querySelector(".modal");
      setTimeout(() => {
        modal.classList.add("show");
      }, 1500);
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

export function createModal(containerElem, cb) {
  const winSound = document.createElement("audio");
  winSound.setAttribute("src", "assets/sounds/win.mp3");
  containerElem.appendChild(winSound);

  winSound.play();

  const timer = document.getElementById("timer");

  const modalElem = document.createElement("div");
  modalElem.classList.add("modal");

  const modalWindowElem = document.createElement("div");
  modalWindowElem.classList.add("modal-window");

  const messageElem = document.createElement("div");
  messageElem.classList.add("message");
  messageElem.innerText = `Great! You have solved the nonogram in ${timer.innerText} seconds!`;
  const closeElem = document.createElement("div");
  closeElem.classList.add("close");
  /*   closeModalElem = document.querySelector(".close"); */

  modalWindowElem.appendChild(messageElem);
  modalWindowElem.appendChild(closeElem);

  modalElem.appendChild(modalWindowElem);
  containerElem.appendChild(modalElem);

  closeModal(cb);
}

export function closeModal(cb) {
  const closeModalElem = document.querySelector(".close");

  if (closeModalElem) {
    closeModalElem.onclick = () => {
      cb();
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

export function initTimer(min, sec) {
  //часы?
  sec = 0;
  min = 0;

  const timer = setInterval(tick, 1000);
  return timer;
}

function tick() {
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
      //05:05
      timer.innerText = `0${min}:0${sec}`;
    } else {
      //10:05
      timer.innerText = `${min}:0${sec}`;
    }
  } else {
    if (min < 10) {
      //05:15
      timer.innerText = `0${min}:${sec}`;
    } else {
      //15:15
      timer.innerText = `${min}:${sec}`;
    }
  }
}

export function showTimer(gameElem) {
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
    }
  };
}

export function saveGame(nonogram) {
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
}

export function continueGame(cb) {
  //timer
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
