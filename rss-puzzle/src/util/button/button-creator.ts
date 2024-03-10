import { IElementParams } from '../../interfaces/IElementParams';
import ElementCreator from '../element-creator';

export default class ButtonCreator extends ElementCreator {
  buttonElement: HTMLButtonElement | null;

  constructor(params: IElementParams) {
    super(params);
    this.buttonElement = null;
  }
}
