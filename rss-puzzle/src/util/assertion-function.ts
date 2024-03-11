const isHtmlInputElement = (v: Element): v is HTMLInputElement =>
  v instanceof HTMLInputElement;

const isHtmlElement = (v: Element): v is HTMLElement =>
  v instanceof HTMLElement;

export { isHtmlElement, isHtmlInputElement };
