import { describe, it, expect } from 'vitest';
import {
  ISignUpFormData,
  validateSignUpSchema,
} from './signUpValidation.shema';
import { TFunction } from './signInValidation.schema';

const t: TFunction = ((key: string) => key) as unknown as TFunction;

describe('validateSignUpSchema', () => {
  it('should pass validation for valid data', async () => {
    const validData: ISignUpFormData = {
      name: 'John',
      email: 'john@example.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  it('should return required error when name is empty', async () => {
    const invalidData: ISignUpFormData = {
      name: '',
      email: 'john@example.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.name.required'
    );
  });

  it('should return capitalized error when name is not capitalized', async () => {
    const invalidData: ISignUpFormData = {
      name: 'john',
      email: 'john@example.com',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.name.capitalized'
    );
  });

  it('should return required error when email is empty', async () => {
    const invalidData: ISignUpFormData = {
      name: 'John',
      email: '',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.email.required'
    );
  });

  it('should return format error when email is invalid', async () => {
    const invalidData: ISignUpFormData = {
      name: 'John',
      email: 'invalid-email',
      password: 'Passw0rd!',
      confirmPassword: 'Passw0rd!',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.email.format'
    );
  });

  it('should return length error when password is too short', async () => {
    const invalidData: ISignUpFormData = {
      name: 'John',
      email: 'john@example.com',
      password: 'a1$',
      confirmPassword: 'a1$',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.password.length'
    );
  });

  it('should return content error when password does not contain a number or special character', async () => {
    const invalidData: ISignUpFormData = {
      name: 'John',
      email: 'john@example.com',
      password: 'PasswordOnly',
      confirmPassword: 'PasswordOnly',
    };

    const schema = validateSignUpSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.password.content'
    );
  });
});
