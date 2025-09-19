import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserFromCookie } from '@/lib/firebase-admin';
import ROUTES from '@/shared/types/types';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const tockenCheck = async () => {
  const cookiesList = await cookies();
  const token = cookiesList.get('token')?.value;

  if (!token) redirect(ROUTES.SIGN_IN);

  const user = await getUserFromCookie(token);

  if (!user) {
    cookieStore.set({
      name: 'token',
      value: '',
      path: '/',
      expires: 0,
    });
    signOut(auth);
    redirect(ROUTES.SIGN_IN);
  }

  return user;
};
