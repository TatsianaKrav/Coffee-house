import State from '../state/state';
import Header from '../view/header/header';
import LoginPage from '../view/loginPage/login';

export default class App {
  constructor() {
    const state = new State();
    /* если есть что-то в state.fields, в route передать стр старта, если нет, стр логина */
    console.log(state.fields);
  }

  createView(): void {
    const header: Header = new Header();
    const loginPage: LoginPage = new LoginPage();
    document.body.append(header.getHTMLElement(), loginPage.getHTMLElement());
  }
}
