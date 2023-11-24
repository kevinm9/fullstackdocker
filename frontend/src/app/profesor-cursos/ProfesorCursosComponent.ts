import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';
import { CursoService } from '../_services/curso.service';
import { Persona } from '../models/persona.model';
import { Curso } from '../models/curso.model';
import { PersonaService } from '../_services/persona.service';

@Component({
  selector: 'app-profesor-cursos',
  templateUrl: './profesor-cursos.component.html',
  styleUrls: ['./profesor-cursos.component.css'],
})
export class ProfesorCursosComponent implements OnInit {
  idProfesor: string | null | undefined;
  Profesor: Persona | undefined;
  userlogin: Persona = {};
  cursos: Curso[] = [];
  userloginid!: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private CursoService: CursoService,
    private PersonaService: PersonaService
  ) {}

  ngOnInit(): void {
    if (this.storageService.getUser() == null) {
      this.router.navigate(['/error']);
    }

    if (this.storageService.isProfesor()) {
      this.router.navigate(['/error']);
    }

    this.route.paramMap.subscribe((params) => {
      this.idProfesor = params.get('id');
      if (!this.idProfesor) {
        this.router.navigate(['/error']);
        return;
      }

      this.PersonaService.get(this.idProfesor).subscribe({
        next: (data) => {
          this.Profesor = data;
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/error']);
        },
      });
    });

    this.userlogin = this.storageService.getUser() as Persona;
    this.userloginid = this.userlogin.id as number;
    this.cargardata();
  }

  cargardata(): void {
    this.CursoService.getAllPorProfesor(this.idProfesor).subscribe((data) => {
      this.cursos = data;
    });
  }

  regresar() {
    this.router.navigate(['profesores']);
  }

  registrarse(idcurso:any,idalumno:any) {
    this.CursoService.matricularse(idcurso, idalumno).subscribe({
      next: (data) => {
        alert('matriculado con exito');
        console.log(data);
        this.cargardata();
      },
      error: (err) => {
        alert('ocurrio un error');
        console.log(err);
      },
    });
  }
}
