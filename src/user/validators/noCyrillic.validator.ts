import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'custom', async: false })
export class NoRussianLettersValidator implements ValidatorConstraintInterface {
  validate(value: string) {
    return !/[а-яА-ЯЁё]/.test(value);
  }

  defaultMessage() {
    return 'Invalid characters detected. Russian letters are not allowed.';
  }
}
