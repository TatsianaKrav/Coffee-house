import { IElementParams } from '../interfaces/IElementParams';

export default class ElementCreator {
  private element: HTMLElement | null;

  constructor(params: IElementParams) {
    this.element = null;
    this.createElement(params);
  }

  public createElement(params: IElementParams): void {
    this.element = document.createElement(params.tag);
    params.cssClasses.forEach((className) => {
      if (this.element !== null) {
        this.element.classList.add(className);
      }
    });
    if (params.textContent) {
      this.element.innerText = params.textContent;
    }

    if (params.attr) {
      params.attr.forEach((attr) => {
        if (this.element) {
          this.element.setAttribute(attr.name, attr.value);
        }
      });
    }

    /*   this.setCallback(params.callback); */
  }

  private setCallback(callback: (event: MouseEvent) => void): void {
    if (this.element) {
      this.element.addEventListener('click', (event: MouseEvent) =>
        callback(event),
      );
    }
  }

  getElement(): HTMLElement {
    if (!this.element) throw new Error('No element found');
    return this.element;
  }
}
