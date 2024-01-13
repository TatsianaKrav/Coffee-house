import { questions } from "../questions-list.js";

const bodyElem = document.body;
let random = randomQuesion(questions.length) - 1;
let { question, answer } = questions[random];
let incorrectCounter = 0;
let countRightLetters = 0;
let manBodyParts = [];

const alphabet = [
  "А",
  "Б",
  "В",
  "Г",
  "Д",
  "Е",
  "Ё",
  "Ж",
  "З",
  "И",
  "Й",
  "К",
  "Л",
  "М",
  "Н",
  "О",
  "П",
  "Р",
  "С",
  "Т",
  "У",
  "Ф",
  "Х",
  "Ц",
  "Ч",
  "Ш",
  "Щ",
  "Ъ",
  "Ы",
  "Ь",
  "Э",
  "Ю",
  "Я",
];

const containerElem = document.createElement("div");
containerElem.classList.add("container");
bodyElem.appendChild(containerElem);

function showGallow() {
  const gallowElem = document.createElement("div");
  gallowElem.classList.add("gallow");
  containerElem.appendChild(gallowElem);

  const rect1Elem = document.createElement("div");
  rect1Elem.classList.add("rect1");

  const rect2Elem = document.createElement("div");
  rect2Elem.classList.add("rect2");

  const rect3Elem = document.createElement("div");
  rect3Elem.classList.add("rect3");

  const rect4Elem = document.createElement("div");
  rect4Elem.classList.add("rect4");

  const headElem = document.createElement("div");
  headElem.classList.add("head");
  headElem.classList.add("man");

  const bodyManElem = document.createElement("div");
  bodyManElem.classList.add("body");
  bodyManElem.classList.add("man");

  const leftArmElem = document.createElement("div");
  leftArmElem.classList.add("left-arm");
  leftArmElem.classList.add("man");

  const rightArmElem = document.createElement("div");
  rightArmElem.classList.add("right-arm");
  rightArmElem.classList.add("man");

  const leftLegElem = document.createElement("div");
  leftLegElem.classList.add("left-leg");
  leftLegElem.classList.add("man");

  const rightLegElem = document.createElement("div");
  rightLegElem.classList.add("right-leg");
  rightLegElem.classList.add("man");

  gallowElem.appendChild(rect1Elem);
  gallowElem.appendChild(rect2Elem);
  gallowElem.appendChild(rect3Elem);
  gallowElem.appendChild(rect4Elem);
  gallowElem.appendChild(headElem);
  gallowElem.appendChild(bodyManElem);
  gallowElem.appendChild(leftArmElem);
  gallowElem.appendChild(rightArmElem);
  gallowElem.appendChild(leftLegElem);
  gallowElem.appendChild(rightLegElem);

  manBodyParts = Array.from(document.getElementsByClassName("man"));
  console.log(manBodyParts);
}

function randomQuesion(max) {
  // случайное число от 1 до (max+1)
  return Math.floor(1 + Math.random() * max);
}

function showQuiz() {
  const quizElem = document.createElement("div");
  quizElem.classList.add("quiz");

  const secretWordElem = document.createElement("div");
  secretWordElem.classList.add("secret-word");

  for (let i = 0; i < answer.length; i++) {
    const underscoreElem = document.createElement("div");
    underscoreElem.classList.add("underscore");
    secretWordElem.appendChild(underscoreElem);
  }

  const questionElem = document.createElement("div");
  questionElem.classList.add("question");

  const questionTaskElem = document.createElement("p");
  questionTaskElem.innerText = `Вопрос: ${question}`;

  questionElem.appendChild(questionTaskElem);

  const incorrectScoreElem = document.createElement("div");
  incorrectScoreElem.classList.add("incorrect-score");

  const incorrectScoreSpanElem = document.createElement("span");
  incorrectScoreSpanElem.innerText = "Неверные попытки: ";

  const scoreElem = document.createElement("div");

  scoreElem.classList.add("score");
  scoreElem.classList.add("incorrect");
  scoreElem.innerText = incorrectCounter;

  const delimElem = document.createElement("div");
  delimElem.classList.add("delim");
  delimElem.classList.add("incorrect");
  delimElem.innerText = " / ";

  const totalElem = document.createElement("div");
  totalElem.classList.add("total");
  totalElem.classList.add("incorrect");
  totalElem.innerText = "6";

  incorrectScoreElem.appendChild(incorrectScoreSpanElem);
  incorrectScoreElem.appendChild(scoreElem);
  incorrectScoreElem.appendChild(delimElem);
  incorrectScoreElem.appendChild(totalElem);

  const keyboardElem = document.createElement("div");
  keyboardElem.classList.add("keyboard");

  for (let i = 0; i < alphabet.length; i++) {
    const letterElem = document.createElement("button");
    letterElem.classList.add("letter");
    letterElem.innerText = alphabet[i];

    letterElem.addEventListener("click", (e) => {
      const chosenLetter = e.target.innerText.toLowerCase();

      if (answer.includes(chosenLetter)) {
        const answArr = answer.split("");
        answArr.forEach((item, index) => {
          if (item === chosenLetter) {
            const upperElems = document.getElementsByClassName("underscore");
            upperElems[index].innerText = chosenLetter.toUpperCase();
            upperElems[index].classList.add("right");
          }
        });

        countRightLetters++;
      } else {
        manBodyParts[incorrectCounter].style.display = "block";
        incorrectCounter++;
        scoreElem.innerText = incorrectCounter;
      }

      checkGame();
    });

    keyboardElem.appendChild(letterElem);
  }

  function checkGame() {
    if (incorrectCounter === 6 || countRightLetters === answer.length) {
      showPopup();
    }
  }

  function showPopup() {
    const modalElem = document.createElement("div");
    modalElem.classList.add("modal");

    const modalWindowElem = document.createElement("div");
    modalWindowElem.classList.add("modal-window");

    const messageElem = document.createElement("div");
    messageElem.classList.add("message");
    if (incorrectCounter === 6) {
      messageElem.innerText = "You failed";
      messageElem.classList.add("fail");
    } else {
      messageElem.innerText = "Congratilations!";
      messageElem.classList.add("win");
    }

    const resultElem = document.createElement("div");
    resultElem.classList.add("result");
    resultElem.innerHTML = `Правильный ответ: <span>${answer}</span>`;

    const buttonElem = document.createElement("button");
    buttonElem.classList.add("button");
    buttonElem.innerText = "Play again";

    modalWindowElem.appendChild(messageElem);
    modalWindowElem.appendChild(resultElem);
    modalWindowElem.appendChild(buttonElem);

    modalElem.appendChild(modalWindowElem);
    containerElem.appendChild(modalElem);

    //transition
    const modal = (document.getElementsByClassName("modal")[0].style.opacity =
      "1");
  }

  containerElem.appendChild(quizElem);
  quizElem.appendChild(secretWordElem);
  quizElem.appendChild(questionElem);
  quizElem.appendChild(incorrectScoreElem);
  quizElem.appendChild(keyboardElem);
}

showGallow();
showQuiz();
