import { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction } from "react";
import { useRouter } from 'next/router';
import axiosClient from "@/config/axiosClient";

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextValue {
    auth: any; // Ajusta según la estructura real de tu objeto auth
    setAuth: Dispatch<SetStateAction<any>>;
    loading: boolean;
    closeSessionAuth: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
// AuthProvider.tsx

// ... (importaciones y definiciones de interfaces)

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();  // Usa useRouter de next/router

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      try {
        const { data } = await axiosClient('/auth/profile', config);
        setAuth(data);
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };

    authenticateUser();
  }, []);

  const closeSessionAuth = () => {
    localStorage.removeItem('token');
    setAuth({});
    router.push('/');  // Redirige a la página de inicio después de cerrar sesión
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        closeSessionAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;

// const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [auth, setAuth] = useState({});
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();



//     useEffect(() => {
//         const authenticateUser = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 }
//             };

//             try {
//                 const { data } = await axiosClient('/auth/profile', config);
//                 setAuth(data);
//                 router.push('/orders');
//             } catch (error) {
//                 setAuth({});
//             } finally {
//                 setLoading(false);
//             }
//         };

//         authenticateUser();
//     }, []);

//     const closeSessionAuth = () => {
//         localStorage.removeItem('token');
//         setAuth({});
//         console.log("User logged out");
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 auth,
//                 setAuth,
//                 loading,
//                 closeSessionAuth
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthProvider };

// export default AuthContext;


// import { useState, useEffect, createContext, ReactNode } from "react";
// import { useRouter } from 'next/router';
// import axiosClient from "@/config/axiosClient";

// interface AuthProviderProps {
//     children: ReactNode;
// }

// const AuthContext = createContext(null);

// const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//     const [auth, setAuth] = useState({});
//     const [loading, setLoading] = useState(true);
//     const router = useRouter();

//     useEffect(() => {
//         const authenticateUser = async () => {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

//             const config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 }
//             };

//             try {
//                 const { data } = await axiosClient('/auth/profile', config);
//                 setAuth(data);
//                 router.push('/');
//             } catch (error) {
//                 setAuth({});
//             } finally {
//                 setLoading(false);
//             }
//         };

//         authenticateUser();
//     }, []);

//     const closeSessionAuth = () => {
//         localStorage.removeItem('token');
//         setAuth({});
//         console.log("User logged out");
//     };

//     return (
//         <AuthContext.Provider
//             value={{
//                 auth,
//                 setAuth,
//                 loading,
//                 closeSessionAuth
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export { AuthProvider };

// export default AuthContext;


// import { useState, useEffect, createContext } from "react";
// import { useRouter } from 'next/router';
// import axiosClient from "@/config/axiosClient";

// // const AuthContext = createContext()

// const AuthContext = createContext(null);

// const AuthProvider = ({children}) => {

//     const [auth, setAuth] = useState({})
//     const [loading, setLoading] = useState(true)
//     const router = useRouter();

//     useEffect(() => {
//         const authenticateUser = async () => {
//             const token = localStorage.getItem('token')
//             if(!token) {
//                 setLoading(false)
//                 return
//             }
    
//             const config = {
//                 headers : {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`
//                 }
//             }
            
//             try {
//                 const {data} = await axiosClient('/auth/profile', config)
//                 setAuth(data)
//                 // navigate('/proyectos')
//                 router.push('/')
//             } catch (error) {
//                 setAuth({})
//             } finally{
//                  setLoading(false) 
//             }
    
            
//         }
//         authenticateUser()
//     }, [])

//     const closeSessionAuth = () => {
//         localStorage.removeItem('token');
//         setAuth({})
//         console.log("User logged out");
//     }

//   return (
//     <AuthContext.Provider
//             value={{
//                 auth,
//                 setAuth, 
//                 loading,
//                 closeSessionAuth
//             }}
//     >
//         {children}
//     </AuthContext.Provider>
//   )
// }

// export { AuthProvider }

// export default AuthContext