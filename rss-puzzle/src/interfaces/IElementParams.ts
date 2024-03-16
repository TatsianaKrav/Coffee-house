export interface IElementParams {
  tag: string;
  cssClasses: Array<string>;
  textContent?: string;
  attr?: Array<IAttribute>;
  callback?: () => void;
}

interface IAttribute {
  name: string;
  value: string;
}
