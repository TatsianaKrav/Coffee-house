import { INews } from '../../../interfaces/INewsResponse';
import { ATTRIBUTE } from '../../../utilities/enums';
import { getCheckedElem, getTypedElement } from '../../../utilities/utilities';
import './news.css';

class News {
    public draw(data: INews[]): void {
        const news: INews[] = data.length >= 10 ? data.filter((_item: INews, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');
        const newsElem = getTypedElement(document, '.news');
        newsElem.innerHTML = '';

        const errorMessage: HTMLElement = document.createElement('div');
        errorMessage.classList.add('no-articles-message');
        errorMessage.innerText = 'No articles';
        errorMessage.style.visibility = 'hidden';
        newsElem.appendChild(errorMessage);

        if (news.length !== 0) {
            news.forEach((item: INews, idx: number) => {
                if (item.content === '[Removed]') {
                    errorMessage.style.visibility = 'visible';
                    return;
                }
                if (!newsItemTemp) throw new Error('Element not found');

                const newsClone = newsItemTemp.content.cloneNode(true);
                const newsCloneTyped = getCheckedElem(newsClone);

                const newsItem = getTypedElement(newsCloneTyped, '.news__item');
                if (idx % 2) newsItem.classList.add('alt');

                const newsMetaPhoto = getTypedElement(newsCloneTyped, '.news__meta-photo');
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

                const newsMetaAuthor = getTypedElement(newsCloneTyped, '.news__meta-author');
                newsMetaAuthor.textContent = item.author || item.source.name;

                const newsMetaDate = getTypedElement(newsCloneTyped, '.news__meta-date');
                newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const newsDescriptionTitle = getTypedElement(newsCloneTyped, '.news__description-title');
                newsDescriptionTitle.textContent = item.title;

                const newsDescriptionSource = getTypedElement(newsCloneTyped, '.news__description-source');
                newsDescriptionSource.textContent = item.source.name;

                const newsDescriptionContent = getTypedElement(newsCloneTyped, '.news__description-content');
                newsDescriptionContent.textContent = item.description;

                const newsReadMoreLink = getTypedElement(newsCloneTyped, '.news__read-more a');
                newsReadMoreLink.setAttribute(ATTRIBUTE.href, item.url);

                fragment.append(newsClone);
            });
        } else {
            /*  const errorMessage: HTMLElement = document.createElement('div');
            errorMessage.classList.add('no-articles-message');
            errorMessage.innerText = 'No articles';
            newsElem.appendChild(errorMessage); */
            errorMessage.style.visibility = 'visible';
        }

        newsElem.style.visibility = 'visible';
        newsElem.appendChild(fragment);
    }
}

export default News;
