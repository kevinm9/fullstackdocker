export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: true, // Valor para producción
  apiUrl: window['env']?.apiUrl || 'http://localhost:8080/api' // Valor por defecto en producción si no se define la variable de entorno
};
