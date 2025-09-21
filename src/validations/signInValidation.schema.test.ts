import { describe, it, expect } from 'vitest';
import {
  validateSignInSchema,
  ISignInFormData,
  TFunction,
} from './signInValidation.schema';

const t: TFunction = ((key: string) => key) as unknown as TFunction;

describe('validateSignInSchema', () => {
  it('should pass validation for valid data', async () => {
    const validData: ISignInFormData = {
      email: 'test@example.com',
      password: 'Passw0rd!',
    };

    const schema = validateSignInSchema(t);
    await expect(schema.validate(validData)).resolves.toEqual(validData);
  });

  it('should return required error when email is empty', async () => {
    const invalidData: ISignInFormData = {
      email: '',
      password: 'Passw0rd!',
    };

    const schema = validateSignInSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.email.required'
    );
  });

  it('should return format error when email is invalid', async () => {
    const invalidData: ISignInFormData = {
      email: 'invalid-email',
      password: 'Passw0rd!',
    };

    const schema = validateSignInSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.email.format'
    );
  });

  it('should return required error when password is empty', async () => {
    const invalidData: ISignInFormData = {
      email: 'test@example.com',
      password: '',
    };

    const schema = validateSignInSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.password.required'
    );
  });

  it('should return length error when password is too short', async () => {
    const invalidData: ISignInFormData = {
      email: 'test@example.com',
      password: 'a1$',
    };

    const schema = validateSignInSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.password.length'
    );
  });

  it('should return content error when password does not contain a number or special character', async () => {
    const invalidData: ISignInFormData = {
      email: 'test@example.com',
      password: 'PasswordOnly',
    };

    const schema = validateSignInSchema(t);
    await expect(schema.validate(invalidData)).rejects.toThrow(
      'form.error.password.content'
    );
  });
});
