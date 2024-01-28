export function checkGameEnd(nonogram) {
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
    //функция проверки правильности заполнения

    const modal = document.querySelector(".modal");
    modal.classList.add("show");
  }
}

export function createModal(containerElem) {
  const modalElem = document.createElement("div");
  modalElem.classList.add("modal");

  const modalWindowElem = document.createElement("div");
  modalWindowElem.classList.add("modal-window");

  const messageElem = document.createElement("div");
  messageElem.classList.add("message");
  messageElem.innerText = "Great! You have solved the nonogram!";

  const closeElem = document.createElement("div");
  closeElem.classList.add("close");

  modalWindowElem.appendChild(messageElem);
  modalWindowElem.appendChild(closeElem);

  modalElem.appendChild(modalWindowElem);
  containerElem.appendChild(modalElem);
}

export function closeModal(cb) {
  const closeModalElem = document.querySelector(".close");

  if (closeModalElem) {
    closeModalElem.onclick = () => {
      cb();
    };
  }
}
