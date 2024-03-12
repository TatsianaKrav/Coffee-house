import { IElementParams } from '../../interfaces/IElementParams';
import Router from '../../router/router';
import State from '../../state/state';
import View from '../view';

export default class StartPage extends View {
  state: State;

  constructor(router: Router, state: State) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['start-page'],
    };

    super(params);
    this.state = state;
  }
}
