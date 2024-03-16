import { IElementParams } from '../../../interfaces/IElementParams';
import { IWord, IWordCollection } from '../../../interfaces/IWordCollection';
import { isHtmlElement } from '../../../util/assertion-function';
import ElementCreator from '../../../util/element-creator';
import getWordsCollection from '../../../util/get-words-collection';
import shuffle from '../../../util/shuffle-array';
import View from '../../view';
import './source.css';

export default class SourceContainer extends View {
  top: number = 0;

  constructor(level: number, round: number, sentence: number) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['sourceContainer'],
    };

    super(params);

    this.configureView(level, round, sentence);
  }

  async configureView(level: number, round: number, currentSentence: number) {
    const wordsCollection: IWordCollection = await getWordsCollection(level);

    const words: Array<IWord> = wordsCollection.rounds[round].words;
    const currentWords = words[currentSentence].textExample.split(' ');

    for (let i = 0; i < currentWords.length; i++) {
      const puzzleParams: IElementParams = {
        tag: 'div',
        cssClasses: ['puzzle'],
        textContent: currentWords[i],
        attr: [
          { name: 'draggable', value: 'true' },
          { name: 'id', value: `${i}` },
        ],
      };

      const puzzleWrapperParams: IElementParams = {
        tag: 'div',
        cssClasses: ['puzzle-wrapper'],
        attr: [{ name: 'id', value: `${i}` }],
      };

      const puzzleCreator: ElementCreator = new ElementCreator(puzzleParams);
      const puzzle = puzzleCreator.getElement();
      puzzle.style.backgroundImage = `url(https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/images/${wordsCollection.rounds[round].levelData.imageSrc}?raw=true)`;

      const puzzleWrapperCreator: ElementCreator = new ElementCreator(
        puzzleWrapperParams,
      );
      puzzleWrapperCreator.getElement().append(puzzleCreator.getElement());
      this.elementCreator.addInnerElement(puzzleWrapperCreator.getElement());
    }

    this.changeBgPosition();

    const wordsInSource = Array.from(this.elementCreator.getElement().children);
    shuffle(wordsInSource);
    this.elementCreator.getElement().innerHTML = '';
    wordsInSource.forEach((item) => {
      if (isHtmlElement(item)) {
        this.elementCreator.addInnerElement(item);
      }
    });
  }

  changeBgPosition() {
    let puzzleWidthWithGap = 0;
    let gap = 0;
    const heigthOfPuzzle = 43;

    const currentContainer = this.elementCreator.getElement();

    for (
      let j = 0, left = 0;
      j < currentContainer.children.length;
      j += 1, left -= puzzleWidthWithGap
    ) {
      const piecePuzzle = currentContainer.children[j].children[0];
      const puzzleWidth = parseFloat(getComputedStyle(piecePuzzle).width);
      puzzleWidthWithGap = puzzleWidth + gap;

      if (isHtmlElement(piecePuzzle)) {
        piecePuzzle.style.backgroundPosition = `${left}px ${this.top}px`;
      }

      gap = 3;
    }

    this.top -= heigthOfPuzzle;
  }
}
