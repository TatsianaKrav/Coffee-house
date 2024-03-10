import { IElementParams } from '../../interfaces/IElementParams';
import ElementCreator from '../element-creator';

export default class InputFieldCreator extends ElementCreator {
  inputElement: HTMLInputElement | null;

  labelElement: HTMLLabelElement | null;

  constructor(params: IElementParams) {
    super(params);
    this.inputElement = null;
    this.labelElement = null;
  }

  createElement(params: IElementParams) {
    this.element = document.createElement('div');
    this.element.classList.add('input');
    params.cssClasses.forEach((className) => {
      if (this.element) {
        this.element.classList.add(className);
      }
    });

    this.inputElement = document.createElement('input');
    this.labelElement = document.createElement('label');
    if (params.textContent) {
      this.labelElement.textContent = params.textContent;
    }

    this.element.append(this.labelElement, this.inputElement);
  }
}
