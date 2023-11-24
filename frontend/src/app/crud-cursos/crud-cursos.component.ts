import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { Curso } from '../models/curso.model';
import { CursoService } from '../_services/curso.service';
import { Persona } from '../models/persona.model';


@Component({
  selector: 'app-crud-cursos',
  templateUrl: './crud-cursos.component.html',
  styleUrls: ['./crud-cursos.component.css'],
})
export class CrudCursosComponent implements OnInit {
  cursoForm: FormGroup;
  modoEdicion = false;
  entidadSeleccionada: Curso | null = null;
  cursos: Curso[] = [];
  userlogin: Persona | undefined;
  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private CursoService: CursoService
  ) {
    this.cursoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      totaldocu: ['', [Validators.required]],
      maxhorduracion: ['', [Validators.required, Validators.maxLength(100)]],
      maxcantalumnos: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.storageService.getUser() == null) {
      this.router.navigate(['/error']);
    }
    this.userlogin = this.storageService.getUser() as Persona;
    this.cargardata();
  }

  cargardata(): void {
    this.CursoService.getAllPorProfesor(this.userlogin?.id).subscribe((data) => {
      this.cursos = data;
    });
  }

  eliminar(id: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
      this.CursoService.delete(id).subscribe({
        next: () => {
          alert('eliminado correctamente');
          this.cargardata();
        },
        error: (err) => {
          console.log(err);
          alert('ocurrio un erro al eliminar');
        },
      });
    }
  }

  limpiarFormulario() {
    this.cursoForm.reset();
    this.modoEdicion = false;
    this.entidadSeleccionada = null;
  }
  clonarFormulario(entidad: Curso) {
    this.modoEdicion = false;
    this.entidadSeleccionada = null;
    this.cursoForm.patchValue(entidad);
  }

  editar(entidad: Curso) {
    this.modoEdicion = true;
    this.entidadSeleccionada = entidad;
    this.cursoForm.patchValue(entidad);
  }

  guardar() {
    this.cursoForm.markAllAsTouched();
    if (this.cursoForm.valid) {
      let entidadform: Curso = this.cursoForm.getRawValue();
      entidadform.profesor = this.userlogin?.id as number;
      if (this.modoEdicion) {
        if (this.entidadSeleccionada !== null) {
          this.CursoService.update(
            this.entidadSeleccionada.id,
            entidadform
          ).subscribe({
            next: (data) => {
              alert('editado con exito');
              console.log(data);
              this.limpiarFormulario();
              this.cargardata();
            },
            error: (err) => {
              console.log(err);
              alert(err?.error?.fieldErrors[0]?.field || 'ocurrio un error');
            },
          });
        }
      } else {
        this.CursoService.create(entidadform).subscribe({
          next: (data) => {
            alert('guardado con exito');
            console.log(data);
            this.cargardata();
          },
          error: (err) => {
            alert(err?.error?.message || 'ocurrio un error');
            console.log(err);
          },
        });
      }
    }
  }
}
