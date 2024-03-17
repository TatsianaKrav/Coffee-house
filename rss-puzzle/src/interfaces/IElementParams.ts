export interface IElementParams {
  tag: string;
  cssClasses: Array<string>;
  textContent?: string;
  attr?: Array<IAttribute>;
  callback?: (e: MouseEvent) => void;
}

interface IAttribute {
  name: string;
  value: string;
}
