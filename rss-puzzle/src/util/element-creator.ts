import { IElementParams } from '../interfaces/IElementParams';

export default class ElementCreator {
  element: HTMLElement | null;

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
    if (params.callback) {
      this.setCallback(params.callback);
    }
  }

  getElement(): HTMLElement {
    if (!this.element) throw new Error('No element found');
    return this.element;
  }

  addInnerElement(element: HTMLElement | ElementCreator) {
    if (!this.element) throw new Error('No element found');
    if (element instanceof ElementCreator) {
      this.element.append(element.getElement());
    } else {
      this.element.append(element);
    }
  }

  getInnerElements(): HTMLCollection {
    if (!this.element) throw new Error('No element found');
    return this.element.children;
  }

  setCallback(callback: (e: MouseEvent) => void) {
    if (typeof callback === 'function' && this.element) {
      this.element.addEventListener('click', (e) => callback(e));
    }
  }
}
