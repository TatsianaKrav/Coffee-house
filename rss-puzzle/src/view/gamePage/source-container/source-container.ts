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

  currentSentence: number = 0;

  constructor(level: number, round: number, sentence: number) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['sourceContainer'],
    };

    super(params);
    this.currentSentence = sentence;

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
        callback: this.moveCard.bind(this),
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

    this.setWrapperWidth();
    this.top -= heigthOfPuzzle;
  }

  moveCard(event: Event) {
    const currentPuzzle = event.target;

    if (currentPuzzle && currentPuzzle instanceof HTMLElement) {
      const puzzleId = currentPuzzle.getAttribute('id');
      const elemetWidth = getComputedStyle(currentPuzzle).width;
      const rows = document.querySelectorAll<HTMLElement>('.row');
      const wrappers = this.elementCreator.getElement().children;

      if (currentPuzzle.parentElement?.classList.contains('row')) {
        const targetCell = Array.from(wrappers).find(
          (item) => item.getAttribute('id') === puzzleId,
        );

        if (targetCell) {
          targetCell.appendChild(currentPuzzle);
        }
      } else if (
        currentPuzzle.parentElement?.classList.contains('puzzle-wrapper')
      ) {
        rows[this.currentSentence].append(currentPuzzle);
        currentPuzzle.style.width = elemetWidth;
      }
    }
  }

  setWrapperWidth() {
    const wrappers = Array.from(this.elementCreator.getElement().children);
    const puzzles = wrappers.map((item) => item.children[0]);

    wrappers.forEach((item, index) => {
      if (item instanceof HTMLElement) {
        item.style.width = getComputedStyle(puzzles[index]).width;
      }
    });
  }
}
