import { IElementParams } from '../../interfaces/IElementParams';
import Router from '../../router/router';
import View from '../view';

export default class GamePage extends View {
  router: Router;

  constructor(router: Router) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['game-page'],
    };

    super(params);
    this.router = router;
  }
}
