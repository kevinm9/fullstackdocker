import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/curso.model';
import { environment } from '../../environments/environment';

const baseUrl = `${environment.apiUrl}/cursos`;

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Curso[]> {
    return this.http.get<Curso[]>(baseUrl);
  }

  getAllPorProfesor(id: any): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${baseUrl}/profesor/${id}`);
  }

  get(id: any): Observable<Curso> {
    return this.http.get<Curso>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: Curso): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  matricularse(idcurso: any, idalumno: any): Observable<any> {
    return this.http.put(`${baseUrl}/matricularse/${idcurso}`, idalumno);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByTitle(title: any): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${baseUrl}?title=${title}`);
  }
}
