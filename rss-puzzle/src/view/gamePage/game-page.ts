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

export default class GamePage extends View {
  router: Router;

  roundCounter: number = 0;

  levelCounter: number = 1;

  currentSentence: number = 1;

  topPosition: number = 0;

  state: State;

  constructor(router: Router) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['game-page'],
    };

    super(params);
    this.router = router;
    this.state = new State();

    if (checkUserInfo(this.state)) {
      /*   this.router.navigate(Pages.LOGIN); */
      window.location.pathname = '/login';
    }

    const logoutElement = document.querySelector<HTMLElement>('.logout');
    if (logoutElement) {
      toggleLogout(checkUserInfo(this.state), logoutElement);
    }
    this.configureView();
  }

  configureView() {
    const containerParams: IElementParams = {
      tag: 'div',
      cssClasses: ['container'],
    };

    const containerCreator: ElementCreator = new ElementCreator(
      containerParams,
    );

    this.elementCreator.addInnerElement(containerCreator.getElement());

    const translatePhraseParams: IElementParams = {
      tag: 'div',
      cssClasses: ['translate'],
      textContent: 'Here there will be some translate',
    };

    const phraseCreator = new ElementCreator(translatePhraseParams);
    containerCreator.addInnerElement(phraseCreator.getElement());

    containerCreator.addInnerElement(
      new TargetContainer(
        this.levelCounter,
        this.roundCounter,
      ).getHTMLElement(),
    );

    containerCreator.addInnerElement(
      new SourceContainer(
        this.levelCounter,
        this.roundCounter,
        this.currentSentence,
      ).getHTMLElement(),
    );
  }
}
