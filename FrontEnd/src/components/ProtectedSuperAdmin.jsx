import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';


export const ProtectedSuperAdmin = ({ children }) => {
  const { user, isSuperAdmin } = useAuth();

  console.log('User in ProtectedSuperAdmin: ', user);
  console.log('Is Super Admin: ', isSuperAdmin);


  if (!user || !isSuperAdmin) {
    return <Navigate to="/login" />;
  }
    // if (user == null || user?.check == false) {
    //   return <Navigate to="/login" />;
    // }


  return children;
};