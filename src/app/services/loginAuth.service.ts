import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginAuthService {
  private readonly USER_KEY = 'loggedInUser';

  constructor() {}

  // Guardar el usuario en el Local Storage
  saveUser(user: any): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Obtener el usuario desde el Local Storage
  getUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // Eliminar el usuario del Local Storage
  logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getUser() !== null;
  }
}
