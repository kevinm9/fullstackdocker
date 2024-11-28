// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: false, // O true si es un entorno de producción
  apiUrl: window['env']?.apiUrl || 'http://localhost:8080/api' // Valor por defecto si no se establece la variable de entorno
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
