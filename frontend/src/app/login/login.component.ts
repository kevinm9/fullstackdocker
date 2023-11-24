import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';
import { Login } from '../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: Login = {
    correo: 'kevin2@kevin.com',
    password: '123456',
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: String | undefined = '';

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser()?.tipodeusuario;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe({
      next: ({ profesor: data }) => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser()?.tipodeusuario;
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
        this.errorMessage = err.error?.message || err.error.error;
        this.isLoginFailed = true;
      },
    });
  }
}
