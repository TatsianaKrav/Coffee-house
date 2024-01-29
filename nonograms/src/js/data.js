export const easy = [
  {
    id: 1,
    name: "Вентилятор",
    lavel: "Легкий",
    image: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 1, 1],
      [0, 0, 1, 0, 0],
      [1, 1, 0, 1, 0],
      [0, 0, 0, 1, 0],
    ],
    topClues: [[1], [1, 2], [1], [2, 1], [1, 1, 1, 1, 1, 1]],
    leftClues: [[1], [2, 1], [1], [1, 2], [1, 1, 1, 1, 1, 1]],
  },
  {
    id: 2,
    name: "Сердечко",
    lavel: "Легкий",
    image: [
      [0, 1, 0, 1, 0],
      [1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1],
      [0, 1, 1, 1, 0],
      [0, 0, 1, 0, 0],
    ],
    topClues: [[2], [4], [4], [4], [2]],
    leftClues: [[1, 1], [5], [5], [3], [1]],
  },
  {
    id: 3,
    name: "Часы",
    lavel: "Легкий",
    image: [
      [0, 1, 1, 1, 0],
      [1, 0, 1, 0, 1],
      [1, 0, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [0, 1, 1, 1, 0],
    ],
    topClues: [[3], [1, 1], [1, 3], [1, 1, 1], [3]],
    leftClues: [[3], [1, 1, 1], [3, 1], [1, 1], [3]],
  },
  {
    id: 4,
    name: "Бомбочка",
    lavel: "Легкий",
    image: [
      [0, 0, 1, 1, 0],
      [0, 1, 0, 0, 1],
      [1, 1, 1, 0, 0],
      [1, 0, 1, 0, 0],
      [1, 1, 1, 0, 0],
    ],
    topClues: [[3], [1, 2], [3, 1], [1], [1]],
    leftClues: [[2], [1, 1], [3], [1, 1], [3]],
  },
  {
    id: 5,
    name: "Коляска",
    lavel: "Легкий",
    image: [
      [0, 1, 1, 0, 0],
      [1, 1, 0, 0, 1],
      [1, 1, 1, 1, 0],
      [0, 1, 1, 0, 0],
      [1, 0, 0, 1, 0],
    ],
    topClues: [[1, 2], [4], [2, 1], [1, 1], [1]],
    leftClues: [[2], [1, 2], [4], [2], [1, 1]],
  },
];

export const medium = [
  {
    id: 1,
    name: "Кот",
    lavel: "Средний",
    image: [
      [0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
      [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
      [1, 1, 0, 1, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
      [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
      [1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 0, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    topClues: [
      [5],
      [2, 2],
      [6],
      [5, 2],
      [3, 5],
      [3],
      [4, 2],
      [4, 1],
      [5, 2],
      [9],
    ],
    leftClues: [
      [3],
      [2, 1, 1, 1],
      [1, 2, 2],
      [1, 5],
      [1, 1, 1, 1],
      [3, 5],
      [4, 3],
      [8],
      [8],
      [2, 4],
    ],
  },
];

export const hard = [];
