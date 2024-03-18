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

    const translatePhraseParams: IElementParams = {
      tag: 'div',
      cssClasses: ['translate'],
      textContent: this.currentWordItem.textExampleTranslate,
    };

    const phraseCreator = new ElementCreator(translatePhraseParams);
    containerCreator.addInnerElement(phraseCreator.getElement());

    containerCreator.addInnerElement(
      new TargetContainer(
        this.levelCounter,
        this.roundCounter,
      ).getHTMLElement(),
    );

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

    const buttonParams: IElementParams = {
      tag: 'button',
      cssClasses: ['btn', 'continue'],
      attr: [{ name: 'disabled', value: 'true' }],
      callback: () => this.showNextSentence(containerCreator, sourceContainer),
    };

    const buttonCreator = new ButtonCreator(buttonParams);
    const buttonElement = buttonCreator.getElement();
    buttonElement.innerHTML = '<span> Continue <span/>';
    containerInfoCreator.addInnerElement(buttonElement);
  }

  showNextSentence(container: ElementCreator, child: View) {
    const heigthOfPuzzle = 43;
    this.topPosition -= heigthOfPuzzle;

    this.currentSentenceCount++;
    const button = document.querySelector<HTMLElement>('.continue');
    button?.setAttribute('disabled', 'true');

    const translate = document.querySelector<HTMLElement>('.translate');

    /*  const newSource = new SourceContainer(
      this.levelCounter,
      this.roundCounter,
      this.currentSentenceCount,
      this.topPosition,
    ); */

    /* const sourceContainer = container.getElement().lastChild; */

    /*  if (sourceContainer) {
      container.getElement().removeChild(sourceContainer);
      container.addInnerElement(newSource.getHTMLElement());
    } */

    if (child instanceof SourceContainer) {
      child.getHTMLElement().innerHTML = '';
      child.configureView(
        this.levelCounter,
        this.roundCounter,
        this.currentSentenceCount,
        this.topPosition,
      );

      if (this.currentRoundWords && translate) {
        this.currentWordItem =
          this.currentRoundWords[this.currentSentenceCount];
        translate.textContent = this.currentWordItem.textExampleTranslate;
      }
    }
  }
}
