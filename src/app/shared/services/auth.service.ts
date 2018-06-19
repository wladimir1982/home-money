export  class AuthService {

  private isAuthenticated = false;

  public login(): void {
    this.isAuthenticated = true;
  }

  public logout(): void {
    this.isAuthenticated = false;
    window.localStorage.clear();
  }

  public isLoggedIn(): boolean {
    return this.isAuthenticated;

  }
}
