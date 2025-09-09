import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import Loader from '../components/Loader';
import { auth } from '@/lib/firebase';

const withUser = <T extends { user?: User | null; name?: string | null }>(
  WrappedComponent: React.FC<T>,
  loader: boolean = true
) => {
  const ComponentWithAuth = (props: T) => {
    const [user, loading] = useAuthState(auth);

    if (loader && loading) {
      return <Loader />;
    }

    if (!loader && loading) {
      return null;
    }

    if (!user) {
      return <WrappedComponent {...props} user={null} />;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withUser;
