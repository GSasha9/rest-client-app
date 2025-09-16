import ProtectedAuthRoute from '../../../components/ProtectedAuthRoute';

const ProtectedAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedAuthRoute>{children} </ProtectedAuthRoute>;
};

export default ProtectedAuthLayout;
