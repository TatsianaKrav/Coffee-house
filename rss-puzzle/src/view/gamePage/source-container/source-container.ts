import { IElementParams } from '../../../interfaces/IElementParams';
import { IWord, IWordCollection } from '../../../interfaces/IWordCollection';
import { isHtmlElement } from '../../../util/assertion-function';
import ElementCreator from '../../../util/element-creator';
import getSentence from '../../../util/get-sentence';
import getWordsCollection from '../../../util/get-words-collection';
import setWrapperWidth from '../../../util/set-wrapper-width';
import shuffle from '../../../util/shuffle-array';
import View from '../../view';
import './source.css';

export default class SourceContainer extends View {
  top: number;

  level: number;

  round: number;

  currentSentence: number = 0;

  wordsCollection: IWordCollection | null = null;

  constructor(level: number, round: number, sentence: number, top: number) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['source-container'],
    };

    super(params);
    this.level = level;
    this.round = round;
    this.top = top;
    this.currentSentence = sentence;

    this.configureView(level, round, sentence, top);
  }

  async configureView(
    level: number,
    round: number,
    currentSentence: number,
    top: number,
  ) {
    this.wordsCollection = await getWordsCollection(level);
    this.currentSentence = currentSentence;

    const words: Array<IWord> = this.wordsCollection.rounds[round].words;
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
      puzzle.style.backgroundImage = `url(https://github.com/rolling-scopes-school/rss-puzzle-data/blob/main/images/${this.wordsCollection.rounds[round].levelData.imageSrc}?raw=true)`;

      const puzzleWrapperCreator: ElementCreator = new ElementCreator(
        puzzleWrapperParams,
      );
      puzzleWrapperCreator.getElement().append(puzzleCreator.getElement());
      this.elementCreator.addInnerElement(puzzleWrapperCreator.getElement());
    }

    this.changeBgPosition(top);

    const wordsInSource = Array.from(this.elementCreator.getElement().children);
    shuffle(wordsInSource);
    this.elementCreator.getElement().innerHTML = '';
    wordsInSource.forEach((item) => {
      if (isHtmlElement(item)) {
        this.elementCreator.addInnerElement(item);
      }
    });
  }

  changeBgPosition(top: number) {
    let puzzleWidthWithGap = 0;
    let gap = 0;

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
        piecePuzzle.style.backgroundPosition = `${left}px ${top}px`;
      }

      gap = 3;
    }

    setWrapperWidth(this.elementCreator);
  }

  moveCard(event: Event) {
    const currentPuzzle = event.target;
    const rows = document.querySelectorAll<HTMLElement>('.row');
    const rowItems = rows[this.currentSentence].children;
    const wrappers = this.elementCreator.getElement().children;

    if (currentPuzzle && currentPuzzle instanceof HTMLElement) {
      const puzzleId = currentPuzzle.getAttribute('id');
      const elemetWidth = getComputedStyle(currentPuzzle).width;

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
    if (!this.wordsCollection) return;
    const words: Array<IWord> = this.wordsCollection.rounds[this.round].words;
    const currentSentence = words[this.currentSentence].textExample;
    const arrFromSentenceWords = currentSentence.split(' ');
    if (rowItems.length === arrFromSentenceWords.length) {
      this.checkPhrase(currentSentence, words);
    }
  }

  checkPhrase(currentSentence: string, words: Array<IWord>) {
    const button = document.querySelector<HTMLElement>('.continue');
    const rows = document.querySelectorAll<HTMLElement>('.row');
    const rowItems = rows[this.currentSentence].children;

    if (!rows) return;

    if (this.currentSentence !== words.length - 1) {
      const resultSentence = getSentence(rowItems);
      if (resultSentence === currentSentence) {
        if (button && button instanceof HTMLElement) {
          button.removeAttribute('disabled');
        }
        rows[this.currentSentence].style.boxShadow = 'none';
      } else {
        rows[this.currentSentence].style.boxShadow = '0 0 5px red';
      }
    } else {
      console.log('show new round');
    }
  }
}
