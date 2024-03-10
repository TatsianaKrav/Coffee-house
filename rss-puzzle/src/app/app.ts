import Header from '../view/header/header';
import LoginPage from '../view/main/login';

export default class App {
  createView(): void {
    const header: Header = new Header();
    const loginPage: LoginPage = new LoginPage();
    document.body.append(header.getHTMLElement(), loginPage.getHTMLElement());
  }
}
