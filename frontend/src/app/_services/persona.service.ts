import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../models/persona.model';

import { environment } from '../../environments/environment';

const AUTH_API = `${environment.apiUrl}/personas`;

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class PersonaService {
  constructor(private http: HttpClient) {}

  listar(): Observable<any> {
    return this.http.get(AUTH_API);
  }

  create(persona: Persona): Observable<any> {
    return this.http.post(AUTH_API, persona, httpOptions);
  }

  update(persona: Persona, personaold: Persona): Observable<any> {
    return this.http.put(`${AUTH_API}/${personaold.id}`, persona, httpOptions);
  }

  get(id: any): Observable<Persona> {
    return this.http.get<Persona>(`${AUTH_API}/${id}`);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${AUTH_API}/${id}`);
  }
}
