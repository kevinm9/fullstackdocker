import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

import { EditarPersonaComponent } from './editar-persona/editar-persona.component';
import { GuardarPersonaComponent } from './guardar-persona/guardar-persona.component';
import { ListarprofesoresComponent } from './listarprofesores/listarprofesores.component';
import { CrudCursosComponent } from './crud-cursos/crud-cursos.component';
import { ProfesorCursosComponent } from './profesor-cursos/ProfesorCursosComponent';
import { IsRegisteredPipe } from './_helpers/is-registered.pipe';
import { IsMaxdealumnosPipe } from './_helpers/is-maxdealumnos.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    EditarPersonaComponent,
    GuardarPersonaComponent,
    ListarprofesoresComponent,
    CrudCursosComponent,
    ProfesorCursosComponent,
    IsRegisteredPipe,
    IsMaxdealumnosPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
