import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

import { environment } from '../../environments/environment';
const API_URL = `${environment.apiUrl}/test/`;
const AUTH_API = `${environment.apiUrl}/personas/`;
const TEXT_URL = `${environment.apiUrl}/test`;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id:any): Observable<Persona> {
    return this.http.get<Persona>(`${AUTH_API}/${id}`);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(TEXT_URL, {
      responseType: 'text',
    });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
