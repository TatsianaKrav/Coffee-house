import Pages from './enums/pages';
import Router from './router/router';
import State from './state/state';
import Route from './types/Route';
import GamePage from './view/gamePage/game-page';
import Header from './view/header/header';
import LoginPage from './view/login-page/login';
import StartPage from './view/startPage/start-page';
import View from './view/view';
import Main from './view/main/main';

export default class App {
  router: Router;

  header: Header | null;

  main: Main | null;

  constructor() {
    this.header = null;
    this.main = null;
    const routes = this.createRoutes();
    this.router = new Router(routes);
  }

  createView(): void {
    const state = new State();

    this.header = new Header(this.router);
    this.main = new Main();

    if (state.fields.size === 0) {
      this.main.setContent(new LoginPage(this.router));
    } else {
      this.main.setContent(new StartPage(this.router));
    }

    document.body.append(
      this.header.getHTMLElement(),
      this.main.getHTMLElement(),
    );
  }

  createRoutes(): Array<Route> {
    return [
      {
        path: `${Pages.LOGIN}`,
        callback: () => {
          this.setContent(new LoginPage(this.router));
        },
      },
      {
        path: `${Pages.START}`,
        callback: () => {
          this.setContent(new StartPage(this.router));
        },
      },
      {
        path: `${Pages.GAME}`,
        callback: () => {
          this.setContent(new GamePage(this.router));
        },
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
