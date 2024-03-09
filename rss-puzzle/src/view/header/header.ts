import { IElementParams } from '../../interfaces/IElementParams';
import ElementCreator from '../../util/element-creator';
import View from '../view';
import './header.css';
import Logout from './logout/logout';

export default class Header extends View {
  constructor() {
    const params: IElementParams = {
      tag: 'header',
      cssClasses: ['header'],
    };

    super(params);
    this.createLogo(params);
  }

  createLogo(params: IElementParams): HTMLElement {
    const headerElement: HTMLElement = this.createView(params);

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
          value: 'assets/logo.jpg',
        },
      ],
    };

    const elementCreatorImg: ElementCreator = new ElementCreator(imgParams);
    /*  const headerElement = document.querySelector<HTMLElement>('.header'); */
    if (!headerElement) throw new Error('Element not found');
    headerElement.append(elementCreatorImg.getElement());

    const logoutComponent: Logout = new Logout();
    headerElement.append(logoutComponent.getHTMLElement());

    return headerElement;
  }
}
