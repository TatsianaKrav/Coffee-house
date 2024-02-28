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
        let target = e.target;
        const newsContainer = e.currentTarget;

        if (!target || !newsContainer) throw new Error(`Element ${target} or ${newsContainer} doesn't exist`);

        while (target !== newsContainer) {
            if (target instanceof HTMLElement && newsContainer instanceof HTMLElement) {
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

                target = target.parentNode;
            } else {
                throw new Error(`Types of elements ${target} and ${newsContainer} are not supported`);
            }
        }
    }
}

export default AppController;
