import ProtectedRoute from '@/components/ProtectedRoute';

const ProtectedAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedRoute>{children} </ProtectedRoute>;
};

export default ProtectedAuthLayout;
