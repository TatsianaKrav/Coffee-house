export default class HistoryRouterHandler {
  callback: (url: string) => void;

  constructor(callback: (url: string) => void) {
    this.callback = callback;
    window.addEventListener('popstate', this.navigate.bind(this));
  }

  navigate(url: PopStateEvent | string) {
    if (typeof url === 'string') {
      this.setHistory(url);
    }
    const urlString = window.location.pathname.slice(1);

    this.callback(urlString);
  }

  setHistory(url: string) {
    window.history.pushState(null, '', `/${url}`);
  }
}
