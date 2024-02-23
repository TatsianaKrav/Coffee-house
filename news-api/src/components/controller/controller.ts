import AppLoader from './appLoader';
import { CallbackSources } from '../../types/CallbackSources';
import { CallbackNews } from '../../types/CallbackNews';
import { ENDPOINT } from '../../utilities/enums';

class AppController extends AppLoader {
    public getSources(callback: CallbackSources): void {
        super.getResp(
            {
                endpoint: ENDPOINT.sources,
            },
            callback
        );
    }

    public getNews(e: MouseEvent, callback: CallbackNews): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        if (!target) return;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    if (sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                    }

                    super.getResp(
                        {
                            endpoint: ENDPOINT.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
