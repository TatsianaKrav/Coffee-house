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

    this.inputElement = document.createElement('input');
    params.cssClasses.forEach((className) => {
      if (this.inputElement) {
        this.inputElement.classList.add(className);
      }
    });

    this.labelElement = document.createElement('label');
    if (params.textContent) {
      this.labelElement.textContent = params.textContent;
    }

    this.element.append(this.labelElement, this.inputElement);
  }

  getInputlement(): HTMLInputElement | null {
    if (!this.element) throw new Error();

    const isHtmlElement = (v: Element): v is HTMLInputElement =>
      v instanceof HTMLInputElement;

    const input = this.element.lastElementChild;
    if (!input) throw new Error();
    if (isHtmlElement(input)) return input;
    return null;
  }
}
