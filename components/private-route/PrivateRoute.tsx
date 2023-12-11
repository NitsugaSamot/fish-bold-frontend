import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuth, { AuthData } from '@/hooks/useAuth';

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const authContext = useAuth();
  const { auth, loading, closeSessionAuth } = authContext || { auth: null, loading: false, closeSessionAuth: () => {} };

  const router = useRouter();

  useEffect(() => {
    if (!auth || !('_id' in auth)) {
      // Usuario no autenticado o auth no tiene la propiedad _id, redirigir a la página principal
      router.push('/');
    }
  }, [auth, loading, router]);

  // Renderizar children solo si el usuario está autenticado
  return auth && '_id' in auth ? <>{children}</> : null;
};

export default PrivateRoute;


// import React, { ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth, { AuthData } from '@/hooks/useAuth';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const authContext = useAuth();
//   const { auth, loading, closeSessionAuth } = authContext ?? { auth: null, loading: false, closeSessionAuth: () => {} };

//   const router = useRouter();

//   useEffect(() => {
//     if (!auth || !auth._id) {
//       // Usuario no autenticado o auth es nulo, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);

//   // Renderizar children solo si el usuario está autenticado
//   return auth && auth._id ? <>{children}</> : null;
// };

// export default PrivateRoute;


// import React, { ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth, { AuthData } from '@/hooks/useAuth';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const authContext = useAuth();
//   const { auth = null, loading, closeSessionAuth } = authContext ?? { auth: null, loading: false, closeSessionAuth: () => {} } as AuthData;

//   const router = useRouter();

//   useEffect(() => {
//     if (!auth?._id) {
//       // Usuario no autenticado, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);

//   // Renderizar children solo si el usuario está autenticado
//   return auth?._id ? <>{children}</> : null;
// };

// export default PrivateRoute;


// import React, { ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth, { AuthData } from '@/hooks/useAuth';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const authContext = useAuth();
//   const { auth, loading, closeSessionAuth } = authContext ?? { auth: null, loading: false, closeSessionAuth: () => {} } as AuthData;

//   const router = useRouter();

//   useEffect(() => {
//     if (!auth?._id) {
//       // Usuario no autenticado, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);

//   // Renderizar children solo si el usuario está autenticado
//   return auth?._id ? <>{children}</> : null;
// };

// export default PrivateRoute;


// import React, { ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth, { AuthData } from '@/hooks/useAuth';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const authContext = useAuth();
//   const { auth, loading } = authContext ?? { auth: null, loading: false } as AuthData;

//   const router = useRouter();

//   useEffect(() => {
//     if (!auth?._id) {
//       // Usuario no autenticado, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);

//   // Renderizar children solo si el usuario está autenticado
//   return auth?._id ? <>{children}</> : null;
// };

// export default PrivateRoute;


// // En tu componente PrivateRoute.tsx
// import React, { ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth, { AuthData } from '@/hooks/useAuth';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { auth, loading } = useAuth() as AuthData; // Usa 'as AuthData' para indicar el tipo
//   const router = useRouter();

//   useEffect(() => {
//     if (!auth._id) {
//       // Usuario no autenticado, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);

//   // Renderizar children solo si el usuario está autenticado
//   return auth._id ? <>{children}</> : null;
// };

// export default PrivateRoute;


// import React, { ReactNode, useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth from '@/hooks/useAuth';

// interface PrivateRouteProps {
//   children: ReactNode;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//   const { auth, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!auth._id) {
//       // Usuario no autenticado, redirigir a la página principal
//       router.push('/');
//     }
//   }, [auth, loading, router]);

//   // Renderizar children solo si el usuario está autenticado
//   return auth._id ? <>{children}</> : null;
// };

// export default PrivateRoute;


// import { useEffect } from 'react';
// import { useRouter } from 'next/router';
// import useAuth from '@/hooks/useAuth';
// import React, { ReactNode } from 'react';
// interface LayoutProps {
//   children: ReactNode;
// }

// const PrivateRoute = ({ children }) => {
//   const { auth, loading } = useAuth();
//   const router = useRouter();

// //   useEffect(() => {
// //     if (!loading && !auth._id) {
// //       // Usuario no autenticado, redirigir a la página principal
// //       router.push('/');
// //     }
// //   }, [auth, loading, router]);
// useEffect(() => {
//     if (!auth._id ) {
//       // Usuario no autenticado, redirigir a la página principal
//     //   router.push('/');
//     <div className="text-white text-center mt-5">
//     <p>Debes iniciar sesión para acceder a esta página.</p>
//   </div>
//     }
//   }, [auth, loading, router]);


//   // Renderizar children solo si el usuario está autenticado
//   return auth._id ? children : null;
// };

// export default PrivateRoute;
