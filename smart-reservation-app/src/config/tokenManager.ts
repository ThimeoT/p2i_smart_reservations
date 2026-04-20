const STORAGE_KEY = 'accessToken';

const accessToken = {
  _token: null as string | null,

  get(): string | null {
    if (!this._token) {
      this._token = localStorage.getItem(STORAGE_KEY);
    }
    return this._token;
  },

  set(token: string | null): void {
    this._token = token;
    if (token) {
      localStorage.setItem(STORAGE_KEY, token);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  clear(): void {
    this.set(null);
  },
};

export default accessToken