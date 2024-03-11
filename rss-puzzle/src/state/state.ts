export default class State {
  fields: Map<string, string>;

  constructor() {
    this.fields = this.loadState();
  }

  saveState(value: string, object: { name: string; surname: string }): void {
    localStorage.setItem(value, JSON.stringify(object));
  }

  loadState(): Map<string, string> {
    const userInfoStored: string | null = localStorage.getItem('userInfo');

    if (userInfoStored) {
      const fieldObject: { name: string; surname: string } =
        JSON.parse(userInfoStored);

      return new Map(Object.entries(fieldObject));
    }
    return new Map();
  }
}
