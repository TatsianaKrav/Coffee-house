import { IElementParams } from '../../interfaces/IElementParams';
import Router from '../../router/router';
import State from '../../state/state';
import ElementCreator from '../../util/element-creator';
import View from '../view';
import './startPage.css';

export default class StartPage extends View {
  state: State;

  constructor(router: Router, state: State) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['start-page'],
    };

    super(params);
    this.state = state;

    this.configureView();
  }

  configureView(): void {
    const nameParams: IElementParams = {
      tag: 'div',
      cssClasses: ['game-name'],
      textContent: 'English Word Puzzle',
    };

    const gameNameCreator: ElementCreator = new ElementCreator(nameParams);
    this.elementCreator.addInnerElement(gameNameCreator.getElement());

    const descriptionParams: IElementParams = {
      tag: 'div',
      cssClasses: ['description-game'],
      textContent:
        'Choose level and round, click on words and collect the right phrase in English. Use tooltips and see the result. At the end you will see an amazing image.',
    };

    const descriptionCreator: ElementCreator = new ElementCreator(
      descriptionParams,
    );
    this.elementCreator.addInnerElement(descriptionCreator.getElement());
  }
}
