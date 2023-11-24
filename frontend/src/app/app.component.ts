import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';
import { Persona } from './models/persona.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: String | null = '';
  isLoggedIn = false;
  isAlumno = false;
  username?: string;
  user?: Persona | null = null;
  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      this.user = this.storageService.getUser();
      this.roles = this.storageService.getRol();
      this.isAlumno = this.storageService.isAlumno();
      this.username = this.user?.nombres;
    } else {
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
        //window.location.reload();
      },
      error: (err) => {
        console.log(err);
        this.storageService.clean();
        //window.location.reload();
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            console.log(res.message);
          } catch {
            console.log(
              `Error with status: ${err.status} - ${err.statusText} - ${err.message} `
            );
          }
        } else {
          console.log(`Error with status: ${err.status}`);
        }
      },
    });
  }
}
