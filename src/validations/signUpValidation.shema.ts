import * as yup from 'yup';
import { TFunction } from './signInValidation.schema';

export const validateSignUpSchema = (t: TFunction) => {
  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('form.error.name.required'))
      .matches(/^[A-Z][a-z]*$/, {
        message: t('form.error.name.capitalized'),
      }),
    email: yup
      .string()
      .lowercase()
      .trim()
      .required(t('form.error.email.required'))
      .email(t('form.error.email.format')),
    password: yup
      .string()
      .required(t('form.error.password.required'))
      .matches(
        /^(?=.*\d)(?=.*[@$#№:;^!%*?&*()_+,."'`~/|])[\p{L}\d@$!%*?&*()_+."']/u,
        t('form.error.password.content')
      )
      .min(8, t('form.error.password.length')),
    confirmPassword: yup
      .string()
      .required(t('form.error.confirmPassword.required'))
      .oneOf([yup.ref('password')], t('form.error.confirmPassword.match')),
  });
};

export interface ISignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
