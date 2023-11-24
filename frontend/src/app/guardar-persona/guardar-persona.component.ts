import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Persona } from '../models/persona.model';
import { passwordValidator } from '../_helpers/validations'; // Importa la función de validación desde el archivo 'validations.ts'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guardar-persona',
  templateUrl: './guardar-persona.component.html',
  styleUrls: ['./guardar-persona.component.css'],
})
export class GuardarPersonaComponent implements OnInit {
  personaForm: FormGroup;
  persona?: Persona;
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
      correo: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(6), passwordValidator],],
      especialidad: ['', [Validators.required, Validators.maxLength(100)]],
      tipodeusuario: ['', [Validators.required]],
      nivelacademico: ['', [Validators.required]],
      motivoderegistro: [{ value: '', disabled: true }, [Validators.required]],
      areaestudio: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  guardarCambios(): void {
    if (this.personaForm.valid) {
          this.personaService$
            .register(this.personaForm.getRawValue())
            .subscribe({
              next: (data) => {
                console.log(data);
                alert('correctamente registrado');
                this.router.navigate(['/login']);
              },
              error: (err) => {
                console.log(err);
                alert(err.error.message || 'ocurrio un error');
              },
            });
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
