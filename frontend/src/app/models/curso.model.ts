import { Persona } from "./persona.model";

export interface Curso {
  id: number;
  nombre: string;
  totaldocu: number;
  maxhorduracion: number;
  maxcantalumnos: number;
  alumnos: number[];
  profesor: number;
}


interface Cursowithmodels {
  id: number;
  nombre: string;
  totaldocu: number;
  maxhorduracion: number;
  maxcantalumnos: number;
  alumnos: Persona[];
  profesor: Persona;
}


interface GetCurso {
  id: number;
  nombre: string;
  totaldocu: number;
  maxhorduracion: number;
  maxcantalumnos: number;
  alumnos: number[];
  profesor: number;
}

interface PostCurso {
  id: number;
  nombre: string;
  totaldocu: number;
  maxhorduracion: number;
  maxcantalumnos: number;
  alumnos: number[];
  profesor: number;
}
