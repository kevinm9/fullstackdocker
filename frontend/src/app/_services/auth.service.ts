import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Persona } from '../models/persona.model';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment';

const AUTH_API = `${environment.apiUrl}`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: Login): Observable<any> {
    return this.http.post(AUTH_API + '/login', login, httpOptions);
  }

  listar(): Observable<any> {
    return this.http.get(AUTH_API + '/personas');
  }

  listarprofesores(): Observable<Persona[]> {
    return this.http.get<Persona[]>(AUTH_API + '/personas/profesores')
    //filtrar los datos desde el frotend y no el backend
    //.pipe(map((personas) => personas.filter((persona) => persona.tipodeusuario === 'profesor')));
  }

  register(persona: Persona): Observable<any> {
    return this.http.post(AUTH_API + '/personas', persona, httpOptions);
  }

  update(persona: Persona, personaold: Persona): Observable<any> {
    return this.http.put(
      AUTH_API + '/personas/' + personaold.id,
      persona,
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + '/signout', {}, httpOptions);
  }

  getUser(id: any): Observable<Persona> {
    return this.http.get<Persona>(`${AUTH_API}/personas/${id}`);
  }

  getPublicContent(): Observable<any> {
    return this.http.get(`${AUTH_API}/test`, {
      responseType: 'text',
    });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/personas/${id}`);
  }
}
