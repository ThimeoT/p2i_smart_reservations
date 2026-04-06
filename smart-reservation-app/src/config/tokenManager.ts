const accessToken = {
  _token: null as string | null,

  get(): string | null {
    if (!this._token) {
      this._token = localStorage.getItem('accessToken')
    }
    return this._token
  },

  set(token: string | null): void {
    this._token = token
    if (token) {
      localStorage.setItem('accessToken', token)
    } else {
      localStorage.removeItem('accessToken')
    }
  },

  clear(): void {
    this.set(null)
  }
}

export default accessToken