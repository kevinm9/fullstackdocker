export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: true, // O true si es un entorno de producción
  apiUrl: 'http://vps-4560746-x.dattaweb.com:8080/api' // Valor por defecto si no se establece la variable de entorno
};
