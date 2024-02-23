import { ISources } from '../../../interfaces/ISourcesResponse';
import { ATTRIBUTE } from '../../../utilities/enums';
import { getTypedElement } from '../../../utilities/utilities';
import './sources.css';

class Sources {
    public draw(data: ISources[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();

        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) throw new Error(`No found element with selector "#sourceItemTemp"`);

        data.forEach((item: ISources) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (sourceClone instanceof DocumentFragment && sourceClone !== null) {
                sourceClone as DocumentFragment;
            } else {
                throw new Error();
            }

            const sourceItemName = getTypedElement(sourceClone, '.source__item-name');
            const sourceItem = getTypedElement(sourceClone, '.source__item');
            sourceItemName.textContent = item.name;
            sourceItem.setAttribute(ATTRIBUTE.dataSourceId, item.id);

            fragment.append(sourceClone);
        });

        const sources = getTypedElement(document, '.sources');
        sources.append(fragment);
    }
}

export default Sources;
