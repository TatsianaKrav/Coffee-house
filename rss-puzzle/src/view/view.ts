import { IElementParams } from '../interfaces/IElementParams';
import ElementCreator from '../util/element-creator';

export default class View {
  elementCreator: ElementCreator;

  constructor(params: IElementParams) {
    this.elementCreator = this.createView(params);
  }

  getHTMLElement(): HTMLElement {
    return this.elementCreator.getElement();
  }

  createView(params: IElementParams): ElementCreator {
    const elementParams: IElementParams = {
      tag: params.tag,
      cssClasses: params.cssClasses,
      textContent: params.textContent,
      attr: params.attr,
    };
    const elementCreator: ElementCreator = new ElementCreator(elementParams);
    this.elementCreator = elementCreator;

    return this.elementCreator;
  }
}
