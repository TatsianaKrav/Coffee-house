import { IElementParams } from '../../interfaces/IElementParams';
import ElementCreator from '../../util/element-creator';
import InputFieldCreator from '../../util/input-field/inpt-field-creator';
import View from '../view';
import './login.css';
import '../../util/button/button.css';

export default class LoginPage extends View {
  constructor() {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['login-page'],
      textContent: 'Please, login to start a game',
    };

    super(params);
    this.configureView(params);
  }

  configureView(params: IElementParams): HTMLElement {
    const loginComponent: ElementCreator = this.createView(params);

    const labelContent = {
      FIELD1: 'First name',
      FIELD2: 'Surname',
    };

    let inputParams: IElementParams = {
      tag: 'input',
      cssClasses: [],
      textContent: labelContent.FIELD1,
    };

    let creatorInput = new InputFieldCreator(inputParams);
    this.elementCreator.addInnerElement(creatorInput);

    inputParams = {
      tag: 'input',
      cssClasses: [],
      textContent: labelContent.FIELD2,
    };

    creatorInput = new InputFieldCreator(inputParams);
    this.elementCreator.addInnerElement(creatorInput);

    const loginElement: HTMLElement = loginComponent.getElement();
    if (!loginElement) throw new Error('Element not found');
    loginElement.append(creatorInput.getElement());

    const buttonParams: IElementParams = {
      tag: 'button',
      cssClasses: ['btn'],
      textContent: 'Login',
      attr: [{ name: 'disabled', value: '' }],
    };

    const buttonCreator: ElementCreator = new ElementCreator(buttonParams);
    loginElement.append(buttonCreator.getElement());

    return loginElement;
  }
}
