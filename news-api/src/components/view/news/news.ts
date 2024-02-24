import { INews } from '../../../interfaces/INewsResponse';
import { ATTRIBUTE } from '../../../utilities/enums';
import { getTypedElement } from '../../../utilities/utilities';
import './news.css';

class News {
    public draw(data: INews[]): void {
        const news: INews[] = data.length >= 10 ? data.filter((_item: INews, idx: number) => idx < 10) : data;
        console.log(news);

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: INews, idx: number) => {
            if (!newsItemTemp) throw new Error('Element not found');

            const newsClone = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment && newsClone !== null) {
                newsClone as DocumentFragment;
            } else {
                throw new Error();
            }

            const newsItem = getTypedElement(newsClone, '.news__item');
            if (idx % 2) newsItem.classList.add('alt');

            const newsMetaPhoto = getTypedElement(newsClone, '.news__meta-photo');
            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage})`;

            const newsMetaAuthor = getTypedElement(newsClone, '.news__meta-author');
            newsMetaAuthor.textContent = item.author || item.source.name;

            const newsMetaDate = getTypedElement(newsClone, '.news__meta-date');
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitle = getTypedElement(newsClone, '.news__description-title');
            newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = getTypedElement(newsClone, '.news__description-source');
            newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = getTypedElement(newsClone, '.news__description-content');
            newsDescriptionContent.textContent = item.description;

            const newsReadMoreLink = getTypedElement(newsClone, '.news__read-more a');
            newsReadMoreLink.setAttribute(ATTRIBUTE.href, item.url);

            fragment.append(newsClone);
        });

        const newsElem = getTypedElement(document, '.news');
        newsElem.style.visibility = 'visible';
        newsElem.innerHTML = '';
        newsElem.appendChild(fragment);
    }
}

export default News;
