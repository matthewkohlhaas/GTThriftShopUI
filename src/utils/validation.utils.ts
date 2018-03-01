import {ErrorStateMatcher} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';

const EMAIL_REGEX: RegExp = new RegExp('^(?:[a-zA-Z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)'
  + '*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@gatech.edu$');
const MIN_PASSWORD_LENGTH = 8;

export class ValidationUtils {

  public static getEmailRegex(): RegExp {
    return EMAIL_REGEX;
  }

  public static getMinPasswordLength(): number {
    return MIN_PASSWORD_LENGTH;
  }

  public static validateTrimmedString(entry: string, validator: (str: string) => boolean): boolean {
    const trimmedEntry: string = (entry) ? entry.trim() : '';
    return validator(trimmedEntry);
  }

  public static validateNotEmpty(entry: string): boolean {
    return this.validateTrimmedString(entry, str => str !== '');
  }

  public static validateEmail(entry: string): boolean {
    return ValidationUtils.validateTrimmedString(entry, str => {
      return ValidationUtils.getEmailRegex().test(str);
    });
  }

  public static validatePassword(entry: string): boolean {
    return ValidationUtils.validateTrimmedString(entry, str => {
      return str.length >= ValidationUtils.getMinPasswordLength();
    });
  }

  public static getErrorStateMatcher(validator: (value: any) => boolean): ErrorStateMatcher {
    return new ValidationErrorStateMatcher(validator);
  }

  public static getEmailErrorStateMatcher(): ErrorStateMatcher {
    return ValidationUtils.getErrorStateMatcher(this.validateEmail);
  }

  public static getPasswordErrorStateMatcher(): ErrorStateMatcher {
    return ValidationUtils.getErrorStateMatcher(this.validatePassword);
  }
}

class ValidationErrorStateMatcher implements ErrorStateMatcher {
  private validator: (value: any) => boolean;

  constructor(validator: (value: any) => boolean) {
    this.validator = validator;
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control
      && (control.invalid || !this.validator(control.value))
      && (control.dirty || control.touched || (form && form.submitted));
  }
}

