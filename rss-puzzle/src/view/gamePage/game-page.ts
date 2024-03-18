import { IElementParams } from '../../interfaces/IElementParams';
import Router from '../../router/router';
import ElementCreator from '../../util/element-creator';
import View from '../view';
import './gamePage.css';
import TargetContainer from './target-container/target-container';
import SourceContainer from './source-container/source-container';
import checkUserInfo from '../../util/check-user-info';
import State from '../../state/state';
import toggleLogout from '../../util/toggle-logout';
import ButtonCreator from '../../util/button/button-creator';
import { IWord, IWordCollection } from '../../interfaces/IWordCollection';
import getWordsCollection from '../../util/get-words-collection';
import { isHtmlElement } from '../../util/assertion-function';

export default class GamePage extends View {
  router: Router;

  roundCounter: number = 0;

  levelCounter: number = 1;

  currentSentenceCount: number = 0;

  topPosition: number = 0;

  state: State;

  wordsCollection: IWordCollection | null = null;

  currentRoundWords: Array<IWord> | null = null;

  currentWordItem: IWord | null = null;

  constructor(router: Router) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['game-page'],
    };

    super(params);
    this.router = router;
    this.state = new State();

    if (checkUserInfo(this.state)) {
      window.location.pathname = '/login';
    }

    const logoutElement = document.querySelector<HTMLElement>('.logout');
    if (logoutElement) {
      toggleLogout(checkUserInfo(this.state), logoutElement);
    }
    this.configureView();
  }

  async configureView() {
    this.wordsCollection = await getWordsCollection(this.levelCounter);
    this.currentRoundWords =
      this.wordsCollection.rounds[this.roundCounter].words;
    this.currentWordItem = this.currentRoundWords[this.currentSentenceCount];

    let containerParams: IElementParams = {
      tag: 'div',
      cssClasses: ['fields'],
    };

    const containerCreator: ElementCreator = new ElementCreator(
      containerParams,
    );

    this.elementCreator.addInnerElement(containerCreator.getElement());

    if (!this.currentWordItem) return;
    const translatePhraseParams: IElementParams = {
      tag: 'div',
      cssClasses: ['translate'],
      textContent: this.currentWordItem.textExampleTranslate,
    };

    const phraseCreator = new ElementCreator(translatePhraseParams);
    containerCreator.addInnerElement(phraseCreator.getElement());

    const targetContainer = new TargetContainer(
      this.levelCounter,
      this.roundCounter,
    );
    containerCreator.addInnerElement(targetContainer.getHTMLElement());

    const sourceContainer = new SourceContainer(
      this.levelCounter,
      this.roundCounter,
      this.currentSentenceCount,
      this.topPosition,
    );

    containerCreator.addInnerElement(sourceContainer.getHTMLElement());

    containerParams = {
      tag: 'div',
      cssClasses: ['info'],
    };

    const containerInfoCreator = new ElementCreator(containerParams);
    this.elementCreator.addInnerElement(containerInfoCreator.getElement());

    let buttonParams: IElementParams = {
      tag: 'button',
      cssClasses: ['btn', 'continue'],
      textContent: 'Continue',
      attr: [{ name: 'disabled', value: 'true' }],
      callback: (event: MouseEvent) =>
        this.showNextSentence(sourceContainer, targetContainer, event),
    };

    let buttonCreator = new ButtonCreator(buttonParams);
    const buttonElement = buttonCreator.getElement();
    containerInfoCreator.addInnerElement(buttonElement);

    buttonParams = {
      tag: 'button',
      cssClasses: ['btn', 'complete'],
      textContent: `I don't know`,
      callback: () => this.autoComplete(sourceContainer, targetContainer),
    };

    buttonCreator = new ButtonCreator(buttonParams);
    containerInfoCreator.addInnerElement(buttonCreator.getElement());
  }

  showNextSentence(
    sourceContainer: View,
    targetContainer: View,
    event: MouseEvent,
  ) {
    const translate = document.querySelector<HTMLElement>('.translate');

    if (
      this.currentRoundWords &&
      this.currentSentenceCount === this.currentRoundWords.length - 1
    ) {
      if (translate) {
        this.switchToNextRound(sourceContainer, targetContainer, translate);
      }

      return;
    }

    const heigthOfPuzzle = 43;
    this.topPosition -= heigthOfPuzzle;

    this.currentSentenceCount++;
    const button = event.target;
    if (button instanceof HTMLElement) {
      button.setAttribute('disabled', 'true');
    }

    if (sourceContainer instanceof SourceContainer) {
      sourceContainer.getHTMLElement().innerHTML = '';
      sourceContainer.configureView(
        this.levelCounter,
        this.roundCounter,
        this.currentSentenceCount,
        this.topPosition,
      );

      if (
        this.currentRoundWords &&
        translate &&
        this.currentSentenceCount <= this.currentRoundWords.length - 1
      ) {
        this.currentWordItem =
          this.currentRoundWords[this.currentSentenceCount];
        translate.textContent = this.currentWordItem.textExampleTranslate;
      }
    }
  }

  autoComplete(source: View, target: View) {
    const currentSentence = this.currentWordItem?.textExample;
    const arrOfCurrentWords = currentSentence?.split(' ');

    const targetContainer = target.getHTMLElement();
    const sourceContainer = source.getHTMLElement();

    if (!targetContainer || !sourceContainer || !arrOfCurrentWords) return;
    const currentRow = targetContainer.children[this.currentSentenceCount];
    if (isHtmlElement(currentRow)) {
      currentRow.style.boxShadow = 'none';
    }

    if (!currentRow) {
      // disable
      return;
    }

    const puzzlesInSource = document.querySelectorAll<HTMLElement>(
      '.puzzle-wrapper .puzzle',
    );

    if (puzzlesInSource) {
      for (let i = 0; i < puzzlesInSource.length; i++) {
        const puzzle = puzzlesInSource[i];
        if (puzzle && puzzle instanceof HTMLElement) {
          const elemetWidth = getComputedStyle(puzzle).width;
          currentRow.append(puzzle);
          puzzle.style.width = elemetWidth;
        }
      }
      const puzzles = Array.from(currentRow.children);
      currentRow.innerHTML = '';
      puzzles.forEach((item, index) => {
        if (isHtmlElement(item)) {
          const currentPuzzle = puzzles.find(
            (puzzle) => Number(puzzle.getAttribute('id')) === index,
          );
          if (currentPuzzle) {
            currentRow.append(currentPuzzle);
          }
        }
      });
    }

    const continueBtn = document.querySelector<HTMLElement>('.continue');
    if (
      continueBtn &&
      this.currentRoundWords &&
      this.currentSentenceCount < this.currentRoundWords.length
    ) {
      continueBtn.removeAttribute('disabled');
    }
  }

  async switchToNextRound(
    sourceContainer: View,
    targetContainer: View,
    translateContainer: HTMLElement,
  ) {
    this.roundCounter++;
    this.currentSentenceCount = 0;
    this.topPosition = 0;

    if (
      this.wordsCollection &&
      this.roundCounter > this.wordsCollection.roundsCount
    ) {
      return;
    }

    this.wordsCollection = await getWordsCollection(this.levelCounter);
    this.currentRoundWords =
      this.wordsCollection.rounds[this.roundCounter].words;
    this.currentWordItem = this.currentRoundWords[this.currentSentenceCount];

    sourceContainer.removeChilds();
    targetContainer.removeChilds();

    if (targetContainer instanceof TargetContainer) {
      targetContainer.configureView(this.levelCounter, this.roundCounter);
    }

    if (sourceContainer instanceof SourceContainer) {
      sourceContainer.configureView(
        this.levelCounter,
        this.roundCounter,
        this.currentSentenceCount,
        this.topPosition,
      );
    }

    translateContainer.textContent =
      this.currentRoundWords[this.currentSentenceCount].textExampleTranslate;

    const continueBtn = document.querySelector<HTMLElement>('.continue');
    if (continueBtn) {
      continueBtn.setAttribute('disabled', 'true');
    }
  }
}
