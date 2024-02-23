import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsResponse } from '../../interfaces/INewsResponse';
import { ISourcesResponse } from '../../interfaces/ISourcesResponse';

class App {
    private controller: AppController;
    private view: AppView;
    readonly sources: HTMLElement | null;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
        this.sources = document.querySelector('.sources');
    }

    public start(): void {
        if (!this.sources) return;
        this.sources.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: INewsResponse) => this.view.drawNews(data))
        );
        this.controller.getSources((data: ISourcesResponse) => this.view.drawSources(data));
    }
}

export default App;
