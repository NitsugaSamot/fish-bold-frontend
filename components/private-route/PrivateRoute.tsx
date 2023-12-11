import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth from '@/hooks/useAuth';
import React, { ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useAuth();
  const router = useRouter();

//   useEffect(() => {
//     if (!loading && !auth._id) {
//       // Usuario no autenticado, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);
useEffect(() => {
    if (!auth._id ) {
      // Usuario no autenticado, redirigir a la página principal
    //   router.push('/');
    <div className="text-white text-center mt-5">
    <p>Debes iniciar sesión para acceder a esta página.</p>
  </div>
    }
  }, [auth, loading, router]);


  // Renderizar children solo si el usuario está autenticado
  return auth._id ? children : null;
};

export default PrivateRoute;
