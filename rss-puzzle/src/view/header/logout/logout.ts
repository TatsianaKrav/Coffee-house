import { IElementParams } from '../../../interfaces/IElementParams';
import View from '../../view';
import './logout.css';

export default class Logout extends View {
  constructor() {
    const params: IElementParams = {
      tag: 'a',
      cssClasses: ['logout'],
      textContent: 'Log out',
      attr: [{ name: 'href', value: '#' }],
    };
    super(params);
  }
}
