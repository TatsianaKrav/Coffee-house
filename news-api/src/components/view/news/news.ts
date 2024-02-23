import { INews } from '../../../interfaces/INewsResponse';
import './news.css';

class News {
    draw(data: INews[]) {
        const news: INews[] = data.length >= 10 ? data.filter((_item: INews, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();

        //query
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: INews, idx: number) => {
            if (!newsItemTemp) throw new Error('Element not found');

            const newsClone = newsItemTemp.content.cloneNode(true);

            if (newsClone instanceof DocumentFragment && newsClone !== null) {
                newsClone as DocumentFragment;
            } else {
                throw new Error();
            }

            //query
            const newsItem: HTMLElement | null = newsClone.querySelector('.news__item');
            if (!newsItem) throw new Error('Element not found');

            if (idx % 2) newsItem.classList.add('alt');

            //query
            const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (!newsMetaPhoto) throw new Error('Element not found');

            newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            //query
            const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (!newsMetaAuthor) throw new Error('Element not found');
            newsMetaAuthor.textContent = item.author || item.source.name;

            //query
            const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (!newsMetaDate) throw new Error('Element not found');
            newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            //query
            const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (!newsDescriptionTitle) throw new Error('Element not found');
            newsDescriptionTitle.textContent = item.title;

            //query
            const newsDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (!newsDescriptionSource) throw new Error('Element not found');
            newsDescriptionSource.textContent = item.source.name;

            //query
            const newsDescriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (!newsDescriptionContent) throw new Error('Element not found');
            newsDescriptionContent.textContent = item.description;

            //query
            const newsReadMoreLink: HTMLElement | null = newsClone.querySelector('.news__read-more a');
            if (!newsReadMoreLink) throw new Error('Element not found');
            newsReadMoreLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        //query
        const newsElem: HTMLElement | null = document.querySelector('.news');
        if (!newsElem) throw new Error('Element not found');
        newsElem.innerHTML = '';
        newsElem.appendChild(fragment);
    }
}

export default News;
