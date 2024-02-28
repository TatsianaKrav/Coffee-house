import { INews, INewsResponse } from '../../interfaces/INewsResponse';
import { ISources, ISourcesResponse } from '../../interfaces/ISourcesResponse';
import News from './news/news';
import Sources from './sources/sources';

export class AppView {
    news: News;
    sources: Sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: INewsResponse): void {
        const values: INews[] = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: ISourcesResponse): void {
        const values: ISources[] = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
