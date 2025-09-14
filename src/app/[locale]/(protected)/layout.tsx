'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '../../../components/Loader';
import ROUTES from '../../../shared/types/types';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../lib/firebase';

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) router.push(ROUTES.MAIN_PAGE);
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return user ? children : null;
};

export default ProtectedAuthRoute;
