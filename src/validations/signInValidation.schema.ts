import { useTranslations } from 'next-intl';
import * as yup from 'yup';

export const validateSignInSchema = (t: TFunction) => {
  return yup.object().shape({
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
  });
};

export interface ISignInFormData {
  email: string;
  password: string;
}

export type TFunction = ReturnType<typeof useTranslations>;
