import { IElementParams } from '../interfaces/IElementParams';
import ElementCreator from '../util/element-creator';

export default class View {
  elementCreator: HTMLElement;

  constructor(params: IElementParams) {
    this.elementCreator = this.createView(params);
  }

  getHTMLElement(): HTMLElement {
    return this.elementCreator;
  }

  createView(params: IElementParams): HTMLElement {
    const elementParams: IElementParams = {
      tag: params.tag,
      cssClasses: params.cssClasses,
      textContent: params.textContent,
      attr: params.attr,
    };
    const elementCreator: ElementCreator = new ElementCreator(elementParams);
    this.elementCreator = elementCreator.getElement();

    return this.elementCreator;
  }
}
