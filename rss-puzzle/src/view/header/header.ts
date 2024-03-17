import Pages from '../../enums/pages';
import { IElementParams } from '../../interfaces/IElementParams';
import Router from '../../router/router';
import State from '../../state/state';
import ElementCreator from '../../util/element-creator';
import View from '../view';
import './header.css';

export default class Header extends View {
  router: Router;

  state: State;

  constructor(router: Router) {
    const params: IElementParams = {
      tag: 'header',
      cssClasses: ['header'],
    };

    super(params);
    this.router = router;
    this.state = new State();
    this.configureView();
  }

  configureView() {
    const imgParams: IElementParams = {
      tag: 'img',
      cssClasses: ['logo'],
      attr: [
        {
          name: 'alt',
          value: 'logo',
        },
        {
          name: 'src',
          value: 'images/logo.jpg',
        },
      ],
      callback: () => this.router.navigate(Pages.START),
    };

    const elementCreatorImg: ElementCreator = new ElementCreator(imgParams);

    this.elementCreator.addInnerElement(elementCreatorImg.getElement());

    const logoutParams: IElementParams = {
      tag: 'a',
      cssClasses: ['logout'],
      textContent: 'Log out',
      attr: [{ name: 'href', value: '#' }],
      callback: () => {
        this.state.removeState();
        this.router.navigate(Pages.LOGIN);
      },
    };

    const logoutComponent: ElementCreator = new ElementCreator(logoutParams);
    this.elementCreator.addInnerElement(logoutComponent.getElement());
  }
}
