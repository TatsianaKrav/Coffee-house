import { ISources } from '../../../interfaces/ISourcesResponse';
import { ATTRIBUTE } from '../../../utilities/enums';
import { getCheckedElem, getTypedElement } from '../../../utilities/utilities';
import './sources.css';

class Sources {
    public draw(data: ISources[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();

        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
        if (!sourceItemTemp) throw new Error(`No found element with selector "#sourceItemTemp"`);

        data.forEach((item: ISources) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true);
            const sourceCloneTyped = getCheckedElem(sourceClone);

            const sourceItemName = getTypedElement(sourceCloneTyped, '.source__item-name');
            const sourceItem = getTypedElement(sourceCloneTyped, '.source__item');
            sourceItemName.textContent = item.name;
            sourceItem.setAttribute(ATTRIBUTE.dataSourceId, item.id);

            fragment.append(sourceClone);
        });

        const sources = getTypedElement(document, '.sources');
        sources.append(fragment);

        this.showByAlphabet();
    }

    public showByAlphabet(): void {
        const mainElem: HTMLElement = getTypedElement(document, 'main');
        const sourcesElem: HTMLElement = getTypedElement(document, '.sources');
        const alphabetElem: HTMLElement = document.createElement('div');
        alphabetElem.classList.add('alphabet');
        const newsContainer: HTMLElement = getTypedElement(document, '.news');

        for (let i = 65; i <= 90; i++) {
            const letterBtn: HTMLElement = document.createElement('button');
            letterBtn.classList.add('btn');
            letterBtn.innerText = String.fromCharCode(i);

            alphabetElem.appendChild(letterBtn);
        }

        const allSourcesButton: HTMLElement = document.createElement('button');
        allSourcesButton.classList.add('all-sources-btn');
        allSourcesButton.innerText = 'All';

        allSourcesButton.onclick = () => {
            messageElem.style.display = 'none';
            articlesNames.forEach((name: HTMLElement) => {
                if (name.parentElement) {
                    name.parentElement.style.display = 'block';
                }
            });

            newsContainer.style.visibility = 'hidden';
            const errorMessage = document.querySelector<HTMLElement>('.no-articles-message');
            if (errorMessage) {
                errorMessage.style.visibility = 'hidden';
            }
        };

        alphabetElem.appendChild(allSourcesButton);
        mainElem.insertBefore(alphabetElem, sourcesElem);

        const letters: NodeListOf<HTMLElement> = document.querySelectorAll('button.btn');
        const articlesNames: NodeListOf<HTMLElement> = document.querySelectorAll('.source__item-name');
        if (!letters || letters.length === 0 || !articlesNames) throw new Error('Elements not found');
        const arrOfArticlesNames: Array<HTMLElement> = Array.from(articlesNames);

        const messageElem: HTMLElement = document.createElement('div');
        messageElem.classList.add('message');
        messageElem.innerText = 'Sources not found';
        alphabetElem.after(messageElem);

        letters.forEach((letter: HTMLElement) => {
            letter.onclick = () => {
                const errorMessage = document.querySelector<HTMLElement>('.no-articles-message');
                if (errorMessage) {
                    errorMessage.style.visibility = 'hidden';
                }

                const currentArticlesNames: Array<HTMLElement> = arrOfArticlesNames.filter((article: HTMLElement) =>
                    article.innerText.toLowerCase().startsWith(letter.innerText.toLowerCase())
                );

                articlesNames.forEach((name: HTMLElement) => {
                    if (name.parentElement) {
                        name.parentElement.style.display = 'none';
                    }
                });

                if (currentArticlesNames.length > 0) {
                    messageElem.style.display = 'none';

                    currentArticlesNames.forEach((name: HTMLElement) => {
                        if (name.parentElement) {
                            name.parentElement.style.display = 'block';
                        }
                    });
                } else {
                    messageElem.style.display = 'block';
                    newsContainer.style.visibility = 'hidden';
                }
            };
        });
    }
}

export default Sources;
