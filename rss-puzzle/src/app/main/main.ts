import { IElementParams } from '../../interfaces/IElementParams';
import View from '../../view/view';

export default class Main extends View {
  constructor() {
    const params: IElementParams = {
      tag: 'main',
      cssClasses: ['main'],
    };
    super(params);
  }

  setContent(content: View) {
    const htmlElement: HTMLElement = this.elementCreator.getElement();
    while (htmlElement.firstElementChild) {
      htmlElement.firstElementChild.remove();
    }
    this.elementCreator.addInnerElement(content.getHTMLElement());
  }
}
