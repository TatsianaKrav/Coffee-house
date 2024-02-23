import { ISources } from '../../../interfaces/ISourcesResponse';
import './sources.css';

class Sources {
    draw(data: ISources[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();

        //query
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISources) => {
            if (!sourceItemTemp) throw new Error(`No foind element with selector ${'#sourceItemTemp'}`);

            const sourceClone = sourceItemTemp.content.cloneNode(true);

            if (sourceClone instanceof DocumentFragment && sourceClone !== null) {
                sourceClone as DocumentFragment;
            } else {
                throw new Error();
            }

            //query
            const sourceItemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');
            const sourceItem: HTMLElement | null = sourceClone.querySelector('.source__item');
            if (sourceItemName && sourceItem) {
                sourceItemName.textContent = item.name;
                sourceItem.setAttribute('data-source-id', item.id);
            } else {
                throw new Error('Element not found');
            }

            fragment.append(sourceClone);
        });

        //query
        const sources: HTMLElement | null = document.querySelector('.sources');
        if (sources) {
            sources.append(fragment);
        } else {
            throw new Error('Element not found');
        }
    }
}

export default Sources;
