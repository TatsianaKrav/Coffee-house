import Header from '../view/header/header';

export default class App {
  constructor() {
    this.createView();
  }

  createView(): void {
    const header: Header = new Header();
    document.body.append(header.getHTMLElement());
  }
}
