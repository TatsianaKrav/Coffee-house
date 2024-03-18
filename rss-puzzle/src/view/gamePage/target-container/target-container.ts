import { IElementParams } from '../../../interfaces/IElementParams';
import { IWord, IWordCollection } from '../../../interfaces/IWordCollection';
import ElementCreator from '../../../util/element-creator';
import getWordsCollection from '../../../util/get-words-collection';
import View from '../../view';
import './target.css';

export default class TargetContainer extends View {
  constructor(level: number, round: number) {
    const params: IElementParams = {
      tag: 'div',
      cssClasses: ['target-container'],
    };

    super(params);

    this.configureView(level, round);
  }

  async configureView(level: number, round: number) {
    const wordsCollection: IWordCollection = await getWordsCollection(level);

    const words: Array<IWord> = wordsCollection.rounds[round].words;

    this.elementCreator.getElement().style.gridTemplateRows = `repeat(${words.length}, 40px)`;

    for (let i = 0; i < words.length; i += 1) {
      const rowsParams: IElementParams = {
        tag: 'div',
        cssClasses: ['row'],
      };
      const rowCreator: ElementCreator = new ElementCreator(rowsParams);
      this.elementCreator.addInnerElement(rowCreator.getElement());
    }
  }
}
