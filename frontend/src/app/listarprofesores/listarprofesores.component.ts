import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Persona } from '../models/persona.model';
import { StorageService } from '../_services/storage.service';
import { Router } from '@angular/router';
import { passwordValidator } from '../_helpers/validations';

@Component({
  selector: 'app-listarprofesores',
  templateUrl: './listarprofesores.component.html',
  styleUrls: ['./listarprofesores.component.css'],
})
export class ListarprofesoresComponent implements OnInit {
  personaForm: FormGroup;
  personas: Persona[] = [];
  modoEdicion = false;
  personaSeleccionada: Persona | null = null;
  isProfesor: boolean = false;
  listnivelacademico: { value: string; nombre: string }[] = [
    { value: 'primaria', nombre: 'Primaria' },
    { value: 'secundaria', nombre: 'Secundaria' },
    { value: 'tercer nivel', nombre: 'Tercer nivel' },
    { value: 'cuarto nivel', nombre: 'Cuarto nivel' },
  ];
  listareaestudio: { value: string; nombre: string }[] = [
    { value: 'matematicas', nombre: 'Matemáticas' },
    { value: 'literatura', nombre: 'Literatura' },
    { value: 'sistemas', nombre: 'Sistemas' },
  ];

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router,
    private personaService: AuthService
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), passwordValidator],
      ],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      tipodeusuario: ['', [Validators.required]],
      nivelacademico: ['', [Validators.required]],
      motivoderegistro: ['', [Validators.required]],
      areaestudio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.storageService.getUser() == null) {
      this.router.navigate(['/error']);
    }
    if (this.storageService.isProfesor()) {
      this.router.navigate(['/error']);
    }
    this.cargarPersonas();
    this.isProfesor = this.storageService.isProfesor();
  }

  cargarPersonas(): void {
    this.personaService.listarprofesores().subscribe((personas) => {
      this.personas = personas;
    });
  }

  changelboxtipodeusuario() {
    switch (this.personaForm.get('tipodeusuario')?.value) {
      case 'estudiante':
        this.personaForm.patchValue({ motivoderegistro: 'academicos' });
        break;
      case 'profesor':
        this.personaForm.patchValue({ motivoderegistro: 'ingreso extras' });
        break;
      default:
        this.personaForm.patchValue({ motivoderegistro: 'academicos' });
        break;
    }
  }

  guardarPersona(): void {
    this.personaForm.markAllAsTouched();
    if (this.personaForm.valid) {
      const persona: Persona = this.personaForm.getRawValue();
      if (this.modoEdicion) {
        if (this.personaSeleccionada !== null) {
          this.personaService
            .update(persona, this.personaSeleccionada)
            .subscribe({
              next: (data) => {
                alert('editado con exito');
                console.log(data);
                this.limpiarFormulario();
                this.cargarPersonas();
              },
              error: (err) => {
                console.log(err);
                alert(err?.error?.fieldErrors[0]?.field || 'ocurrio un error');
              },
            });
        }
      } else {
        this.personaService.register(persona).subscribe({
          next: (data) => {
            alert('guardado con exito');
            console.log(data);
            this.cargarPersonas();
          },
          error: (err) => {
            alert(err?.error?.message || 'ocurrio un error');
            console.log(err);
          },
        });
      }
    }
  }

  eliminarPersona(id: any): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      this.personaService.delete(id).subscribe({
        next: () => {
          alert('eliminado correctamente');
          this.cargarPersonas();
        },
        error: (err) => {
          console.log(err);
          alert('ocurrio un erro al eliminar');
        },
      });
    }
  }

  limpiarFormulario(): void {
    this.personaForm.get('tipodeusuario')!.enable(); // ! le dice a TypeScript que ignore la posibilidad de que sea null
    this.personaForm.get('correo')!.enable();
    this.personaForm.get('motivoderegistro')!.enable();
    this.personaForm.reset();
    this.modoEdicion = false;
    this.personaSeleccionada = null;
  }

  editarPersona(persona: Persona): void {
    this.personaForm.get('tipodeusuario')!.disable(); // ! le dice a TypeScript que ignore la posibilidad de que sea null
    this.personaForm.get('correo')!.disable();
    this.personaForm.get('motivoderegistro')!.disable();
    this.modoEdicion = true;
    this.personaSeleccionada = persona;
    this.personaForm.patchValue(persona);
  }

  clonarFormulario(persona: Persona) {
    this.modoEdicion = false;
    this.personaSeleccionada = null;
    this.personaForm.patchValue(persona);
  }

  registrarcurso(persona: Persona) {
    this.router.navigate(['/cursosdelprofesor', persona.id], {
      queryParams: { nombredelprofesor: persona.nombres },
    });
  }
}
