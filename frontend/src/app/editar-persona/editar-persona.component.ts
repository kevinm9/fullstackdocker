import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Persona } from '../models/persona.model';
import { passwordValidator } from '../_helpers/validations'; // Importa la función de validación desde el archivo 'validations.ts'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css'],
})
export class EditarPersonaComponent implements OnInit {
  personaForm: FormGroup;
  persona: Persona | null = null;
  listnivelacademico: { value: string; nombre: string }[] = [
    { value: 'primaria', nombre: 'Primaria' },
    { value: 'secundaria', nombre: 'secundaria' },
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
    private personaService$: AuthService,
    private storageService$: StorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.personaForm = this.fb.group({
      nombres: ['', [Validators.required]],
      correo: [{ value: null, disabled: true }, [Validators.required]],
      password: [
        '',
        [Validators.required, Validators.minLength(6), passwordValidator],
      ],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      tipodeusuario: [{ value: null, disabled: true }, [Validators.required]],
      nivelacademico: ['', [Validators.required]],
      motivoderegistro: [
        { value: null, disabled: true },
        [Validators.required],
      ],
      areaestudio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.storageService$.getUser() == null) {
      this.router.navigate(['/error']);
    }

    this.route.paramMap.subscribe((params) => {
      let id: any = params.get('id');
      if (!id) {
        this.router.navigate(['/error']);
        return;
      }
      this.personaService$.getUser(id).subscribe({
        next: (data) => {
          this.persona = data;
          this.personaForm.patchValue(data);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/error']);
        },
      });
    });
  }

  guardarCambios(): void {
    this.personaForm.markAllAsTouched();
    if (this.personaForm.valid) {
      let form = this.personaForm.getRawValue();
      if (this.persona !== null) {
        this.personaService$.update(form, this.persona).subscribe({
          next: (data) => {
            alert('actualizado registrado');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    } else {
      console.log('formulario invalido');
    }
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
}
