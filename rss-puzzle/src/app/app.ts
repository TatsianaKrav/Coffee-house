import Pages from '../enums/pages';
import Router from '../router/router';
import State from '../state/state';
import Route from '../types/Route';
import Header from '../view/header/header';
import LoginPage from '../view/loginPage/login';
import StartPage from '../view/startPage/startPage';
import View from '../view/view';
import Main from './main/main';

export default class App {
  router: Router;

  header: Header | null;

  main: Main | null;

  constructor() {
    this.header = null;
    this.main = null;

    const state = new State();
    const routes = this.createRoutes(state);
    this.router = new Router(routes);
  }

  createView(): void {
    const state = new State();

    this.header = new Header(this.router);
    this.main = new Main();

    /*   this.main.setContent(new LoginPage(this.router, state)); */

    if (state.fields.size === 0) {
      this.main.setContent(new LoginPage(this.router, state));
    } else {
      this.main.setContent(new StartPage(this.router, state));
    }

    document.body.append(
      this.header.getHTMLElement(),
      this.main.getHTMLElement(),
    );
  }

  createRoutes(state: State): Array<Route> {
    return [
      {
        path: ``,
        callback: () => {
          this.setContent(new LoginPage(this.router, state));
        },
      },
      {
        path: `${Pages.LOGIN}`,
        callback: () => {
          this.setContent(new LoginPage(this.router, state));
        },
      },
      {
        path: `${Pages.START}`,
        callback: () => {
          this.setContent(new StartPage(this.router, state));
        },
      },
      {
        path: `${Pages.GAME}`,
        callback: () => {},
      },
      {
        path: `${Pages.RESULT}`,
        callback: () => {},
      },
    ];
  }

  setContent(view: View) {
    if (this.main) this.main.setContent(view);
  }
}
