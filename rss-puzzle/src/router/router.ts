import Pages from '../enums/pages';
import Route from '../types/Route';
import UrlInfo from '../types/UrlInfo';

export default class Router {
  routes: Array<Route>;

  constructor(routes: Array<Route>) {
    this.routes = routes;
  }

  navigate(url: string) {
    const request = this.parseUrl(url);

    const pathForFound =
      request.resource === ''
        ? request.path
        : `${request.path}/${request.resource}`;

    const route = this.routes.find((item) => item.path === pathForFound);

    /*  window.history.pushState(null, '', `/${url}`); */

    if (!route) {
      this.navigate(Pages.LOGIN);
      return;
    }

    route?.callback();
  }

  // remove resource
  parseUrl(url: string): UrlInfo {
    const result: UrlInfo = { path: '', resource: '' };
    const path: Array<string> = url.split('/');
    [result.path, result.resource = ''] = path;

    return result;
  }
}
