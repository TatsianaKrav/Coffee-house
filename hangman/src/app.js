import { questions } from "../questions-list.js";

const bodyElem = document.body;
let random = randomQuesion(questions.length) - 1;
let { question, answer } = questions[random];

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

  const bodyManElem = document.createElement("div");
  bodyManElem.classList.add("body");

  const leftArmElem = document.createElement("div");
  leftArmElem.classList.add("left-arm");

  const rightArmElem = document.createElement("div");
  rightArmElem.classList.add("right-arm");

  const leftLegElem = document.createElement("div");
  leftLegElem.classList.add("left-leg");

  const rightLegElem = document.createElement("div");
  rightLegElem.classList.add("right-leg");

  gallowElem.appendChild(rect1Elem);
  gallowElem.appendChild(rect2Elem);
  gallowElem.appendChild(rect3Elem);
  gallowElem.appendChild(rect4Elem);
  gallowElem.appendChild(headElem);
  gallowElem.appendChild(bodyManElem);
  gallowElem.appendChild(leftArmElem);
  gallowElem.appendChild(leftLegElem);
  gallowElem.appendChild(rightArmElem);
  gallowElem.appendChild(rightLegElem);
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

  const questionSpanElem = document.createElement("span");
  questionSpanElem.innerText = "Вопрос: ";

  const questionTaskElem = document.createElement("p");
  questionTaskElem.innerText = question;

  questionElem.appendChild(questionSpanElem);
  questionElem.appendChild(questionTaskElem);

  const incorrectScoreElem = document.createElement("div");
  incorrectScoreElem.classList.add("incorrect-score");

  const incorrectScoreSpanElem = document.createElement("span");
  incorrectScoreSpanElem.innerText = "Неверные попытки: ";

  const scoreElem = document.createElement("div");

  //insert counter
  scoreElem.classList.add("score");
  scoreElem.classList.add("incorrect");

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
    const letterElem = document.createElement("div");
    letterElem.classList.add("letter");
    letterElem.innerText = alphabet[i];

    keyboardElem.appendChild(letterElem);
  }

  containerElem.appendChild(quizElem);
  quizElem.appendChild(secretWordElem);
  quizElem.appendChild(questionElem);
  quizElem.appendChild(incorrectScoreElem);
  quizElem.appendChild(keyboardElem);
}

showGallow();
showQuiz();
