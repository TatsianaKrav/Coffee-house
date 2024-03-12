import UserInfo from '../types/UserInfo';

export default class State {
  fields: Map<string, string>;

  constructor() {
    this.fields = this.loadState();
  }

  saveState(value: string, userData: UserInfo): void {
    localStorage.setItem(value, JSON.stringify(userData));
  }

  removeState(): void {
    localStorage.removeItem('userInfo');
  }

  loadState(): Map<string, string> {
    const userInfoStored: string | null = localStorage.getItem('userInfo');

    if (userInfoStored) {
      const fieldObject: UserInfo = JSON.parse(userInfoStored);

      return new Map(Object.entries(fieldObject));
    }
    return new Map();
  }
}
