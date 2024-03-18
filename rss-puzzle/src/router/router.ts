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
  }

  navigate(url: string) {
    this.handler.navigate(url);
  }

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
