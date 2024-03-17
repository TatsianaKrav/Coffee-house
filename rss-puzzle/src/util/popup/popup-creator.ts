import { IElementParams } from '../../interfaces/IElementParams';
import View from '../../view/view';
import ElementCreator from '../element-creator';
import './popup.css';

export default class Popup extends View {
  constructor(params: IElementParams) {
    super(params);

    this.configureView();
  }

  configureView() {
    const modalParams: IElementParams = {
      tag: 'div',
      cssClasses: ['modal-window'],
    };

    const popupCreator: ElementCreator = new ElementCreator(modalParams);
    this.elementCreator.addInnerElement(popupCreator.getElement());

    const closeParams: IElementParams = {
      tag: 'div',
      cssClasses: ['close'],
    };

    const closeCreator: ElementCreator = new ElementCreator(closeParams);
    popupCreator.addInnerElement(closeCreator.getElement());
  }
}
