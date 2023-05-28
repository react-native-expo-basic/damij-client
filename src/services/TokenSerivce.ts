const LOCAL_STORAGE_KEY_NAME = "token";
export default class TokenService {
  public static get(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEY_NAME);
  }
  public static set(token: string): void {
    return localStorage.setItem(LOCAL_STORAGE_KEY_NAME, token);
  }
  public static remove(): void {
    return localStorage.removeItem(LOCAL_STORAGE_KEY_NAME);
  }
}
