// is-registered.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { Curso } from '../models/curso.model';

@Pipe({
  name: 'IsMaxdealumnos',
})
export class IsMaxdealumnosPipe implements PipeTransform {
  transform(curso: Curso): boolean {
    return curso.alumnos.length < curso.maxcantalumnos;
  }
}
