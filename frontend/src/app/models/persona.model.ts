export interface Persona {
  id?: Number;
  nombres?: string;
  correo?: string;
  password?: string;
  especialidad?: string;
  tipodeusuario?: string; // El signo de interrogación indica que este campo es opcional
  nivelacademico?: string;
  motivoderegistro?: string;
  areaestudio?: string;
}


export interface PostPersona {
  nombres: string;
  correo: string;
  password: string;
  especialidad: string;
  tipodeusuario: string; // El signo de interrogación indica que este campo es opcional
  nivelacademico: string;
  motivoderegistro: string;
  areaestudio: string;
}


export interface GetPersona {
  id: Number;
  nombres: string;
  correo: string;
  password: string;
  especialidad: string;
  tipodeusuario: string; // El signo de interrogación indica que este campo es opcional
  nivelacademico: string;
  motivoderegistro: string;
  areaestudio: string;
}





