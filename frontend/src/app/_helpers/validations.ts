import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.value;

  if (!/[A-Z]/.test(password)) {
    return { faltaMayuscula: true };
  }

  if (!/[a-z]/.test(password)) {
    return { faltaMinuscula: true };
  }

  if (!/[0-9]/.test(password)) {
    return { faltaNumero: true };
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return { faltaCaracterEspecial: true };
  }

  return null;
}
