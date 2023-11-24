import { Injectable } from '@angular/core';
import { Persona } from '../models/persona.model';

const USER_KEY = 'auth-user';
const ROL_PROFESOR = 'profesor';
const ROL_ALUMNO = 'estudiante';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): Persona | null {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return true;
    }
    return false;
  }

  public getRol(): String {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      let rol: Persona = JSON.parse(user);
      return rol.tipodeusuario ? rol.tipodeusuario : '';
    }
    return '';
  }

  public isProfesor(): boolean {
    const rol = this.getRol();
    if (rol == ROL_PROFESOR) {
      return true;
    }
    return false;
  }

  public isAlumno(): boolean {
    const rol = this.getRol();
    if (rol == ROL_ALUMNO) {
      return true;
    }
    return false;
  }
}
