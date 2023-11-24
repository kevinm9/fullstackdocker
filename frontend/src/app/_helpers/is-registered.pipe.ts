// is-registered.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '../models/curso.model';

@Pipe({
  name: 'isRegistered',
})
export class IsRegisteredPipe implements PipeTransform {
  transform(personaId: number, curso: Curso): boolean {
    // Verificar si la persona está registrada en algún curso
    return curso.alumnos.some((matriculadoid) => matriculadoid === personaId);
  }
}
