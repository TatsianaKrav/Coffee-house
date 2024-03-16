export interface IWordCollection {
  rounds: Array<IRoundData>;
  roundsCount: number;
}

interface IRoundData {
  levelData: ILevelData;
  words: Array<IWord>;
}

export interface IWord {
  audioExample: string;
  id: number;
  textExample: string;
  textExampleTranslate: string;
  word: string;
  wordTranslate: string;
}

interface ILevelData {
  author: string;
  cutSrc: string;
  id: string;
  imageSrc: string;
  name: string;
  year: string;
}
