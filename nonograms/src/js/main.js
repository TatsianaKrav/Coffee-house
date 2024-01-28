import { easy, medium, hard } from "./data.js";
import { checkGameEnd, createModal, closeModal } from "./utils.js";

const bodyElem = document.body;
const containerElem = document.createElement("div");
containerElem.classList.add("container");

bodyElem.appendChild(containerElem);

let nonograms = [];
let nonogram = {};

//получить из select/radio
let level = "Легкий";

function getLevel() {
  switch (level) {
    case "Легкий":
      nonograms = easy;
      break;
    case "Средний":
      nonograms = medium;
      break;
    case "Сложный":
      nonograms = hard;
      break;
    default:
      [];
  }

  return nonograms;
}

nonograms = getLevel();

function showField(nonograms) {
  const tableElem = document.createElement("table");
  const tableId = Math.floor(1 + Math.random() * 5);
  nonogram = nonograms.find((item) => item.id === tableId);
  const topClues = nonogram.topClues;
  const leftClues = nonogram.leftClues;

  //localStorage проверка на пройденный кроссворд

  for (let i = 0; i <= nonograms.length; i++) {
    const row = document.createElement("tr");

    for (let j = 0; j <= nonograms.length; j++) {
      const col = document.createElement("td");

      if (i === 0 && j === 0) {
        col.classList.add("empty");
      } else if ((i === 0) & (j !== 0)) {
        col.classList.add("top-cell");

        for (let k = 0; k < topClues[j - 1].length; k++) {
          const spanElem = document.createElement("span");
          spanElem.classList.add("top");
          spanElem.innerText = topClues[j - 1][k];
          col.appendChild(spanElem);
        }
      } else if (i !== 0 && j === 0) {
        col.classList.add("left-cell");

        for (let k = 0; k < leftClues[i - 1].length; k++) {
          const spanElem = document.createElement("span");
          spanElem.classList.add("left");
          spanElem.innerText = leftClues[i - 1][k];
          col.appendChild(spanElem);
        }
      } else {
        col.classList.add("cell");
      }

      row.appendChild(col);
    }

    tableElem.appendChild(row);
  }

  containerElem.appendChild(tableElem);
}

showField(getLevel());

function fillCell() {
  const cells = document.querySelectorAll("td:not(.left-cell):not(.top-cell)");
  cells.forEach((item) => {
    if (item.classList.contains("left") || item.classList.contains("top")) {
      return false;
    }

    item.onclick = () => {
      if (item.getAttribute("not") === "x") {
        return false;
      }
      if (!item.getAttribute("filled")) {
        item.style.backgroundColor = "black"; // или добавить класс
        item.setAttribute("filled", "true");
      } else if (item.getAttribute("filled")) {
        item.style.backgroundColor = "transparent"; // или добавить класс
        item.removeAttribute("filled");
      }

      checkGameEnd(nonogram);
    };

    item.addEventListener("contextmenu", (e) => {
      e.preventDefault();

      if (item.getAttribute("filled")) return false;

      if (item.getAttribute("not") === "x") {
        item.classList.remove("not");
        item.setAttribute("not", "null");
      } else {
        item.classList.add("not");
        item.setAttribute("not", "x");
      }
    });
  });
}

fillCell();

createModal(containerElem);
closeModal(() => {
  containerElem.innerHTML = "";
  showField(nonograms);
});
