import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @ViewChild('f') formulario: any;

  form: any = {
    nombres: null,
    correo: null,
    password: null,
    tipodeusuario: null,
    nivelacademico: null,
    motivoderegistro: null,
  };

  lista: string[] = ['estudiante', 'maestro'];

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.listar().subscribe(
      (response) => {
        console.log('Respuesta de la API:', response);
      },
      (error) => {
        console.error('Error al cargar los datos:', error);
      }
    );
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe({
      next: (data) => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }
  changelboxtipodeusuario() {
    switch (this.form.tipodeusuario) {
      case 'estudiante':
        this.form.motivoderegistro = 'academicos';
        break;
      case 'maestro':
        this.form.motivoderegistro = 'ingreso extras';
        break;
      default:
        this.form.motivoderegistro = 'academicos';
        break;
    }
  }

  reset() {
    window.location.reload();
  }
}
