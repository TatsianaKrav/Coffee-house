import Pages from '../enums/pages';
import State from '../state/state';
import Route from '../types/Route';
import HistoryRouterHandler from './handler/history-router-hanndler';

export default class Router {
  routes: Array<Route>;

  state: State;

  handler: HistoryRouterHandler;

  constructor(routes: Array<Route>) {
    this.routes = routes;
    this.state = new State();

    this.handler = new HistoryRouterHandler(this.urlChangedHandler.bind(this));

    document.addEventListener('DOMContentLoaded', () => {
      this.handler.navigate(this.getCurrentPath());
    });

    /*   document.addEventListener('DOMContentLoaded', () => {
      const path = this.getCurrentPath();
      if (this.state.fields.size > 0) {
        this.navigate(Pages.START);
      } else {
        this.navigate(path);
      }
    });
    window.addEventListener('popstate', this.browserChangeHandler.bind(this));
    window.addEventListener('hashchange', this.browserChangeHandler.bind(this)); */
  }

  /*   navigate(url: string) {
    const request = this.parseUrl(url);

    const pathForFound =
      request.resource === ''
        ? request.path
        : `${request.path}/${request.resource}`;

    const route = this.routes.find((item) => item.path === pathForFound);

    window.history.pushState(null, '', `/${url}`);

    if (!route) {
      this.navigate(Pages.LOGIN);
      return;
    }

    route?.callback();
  } */

  navigate(url: string) {
    this.handler.navigate(url);
  }

  /*  parseUrl(url: string): UrlInfo {
    const result: UrlInfo = { path: '', resource: '' };
    const path: Array<string> = url.split('/');
    [result.path, result.resource = ''] = path;

    return result;
  } */

  /*  browserChangeHandler() {
    const path = this.getCurrentPath();
    this.navigate(path);
  } */

  getCurrentPath(): string {
    if (window.location.hash) {
      return window.location.hash.slice(1);
    }
    return window.location.pathname.slice(1);
  }

  urlChangedHandler(url: string) {
    const route = this.routes.find((item) => item.path === url);

    if (!route) {
      this.navigate(Pages.START);
      return;
    }

    route.callback();
  }
}
