import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axiosClient from '@/config/axiosClient';

const Token = () => {
  const [verificationStatus, setVerificationStatus] = useState('verifying');
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        if (!token) {
          setVerificationStatus('error');
          return;
        }

        const url = `/auth/verify-account/${token}`;
        await axiosClient(url);

        console.log(token)
        setVerificationStatus('success');
        router.push('/login')
        
      } catch (error) {
        console.error('Error al verificar cuenta:', error);
        setVerificationStatus('error');
        console.log(error)
      }
    };

    if (token) {
      verifyAccount();
    }
  }, [token]);

  const getMessage = () => {
    switch (verificationStatus) {
      case 'verifying':
        return 'Verificando cuenta...';
      case 'success':
        return '¡Felicidades, tu cuenta se verificó correctamente!';
      case 'error':
        return 'Hubo un error al verificar tu cuenta. Por favor, inténtalo de nuevo o contacta con soporte.';
      default:
        return '';
    }
  };

  return (
    <div className="bg-blue-800 min-h-screen flex flex-col justify-center ">
      <p className='msg color-white'>{getMessage()}</p>
    </div>
  );
};

export default Token;


// // Importa las bibliotecas y módulos necesarios
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axiosClient from '@/config/axiosClient';

// // Definir el componente ConfirmAccount
// const ConfirmAccount = () => {
//   // Estado para manejar el estado de la verificación
//   const [verificationStatus, setVerificationStatus] = useState('verifying');

//   // Obtener el token de la URL utilizando useRouter de Next.js
//   const router = useRouter();
//   const { token } = router.query;

//   // Efecto para realizar la verificación al cargar el componente
//   useEffect(() => {
//     const verifyAccount = async () => {
//       try {
//         // Si no hay token, manejar el caso adecuado
//         if (!token) {
//           setVerificationStatus('error');
//           return;
//         }

//         // Hacer la solicitud al servidor para verificar el token
//         const url = `/auth/verify-account/${token}`;
//         await axiosClient(url);

//         // Si la verificación es exitosa, actualizar el estado
//         setVerificationStatus('success');
//       } catch (error) {
//         console.error('Error al verificar cuenta:', error);
//         // Manejar el error, por ejemplo, si el token no es válido
//         setVerificationStatus('error');
//       }
//     };

//     // Verificar la cuenta solo si hay un token válido
//     if (token) {
//       verifyAccount();
//     }
//   }, [token]);

//   // Función para obtener el mensaje según el estado de verificación
//   const getMessage = () => {
//     switch (verificationStatus) {
//       case 'verifying':
//         return 'Verificando cuenta...';
//       case 'success':
//         return '¡Felicidades, tu cuenta se verificó correctamente!';
//       case 'error':
//         return 'Hubo un error al verificar tu cuenta. Por favor, inténtalo de nuevo o contacta con soporte.';
//       default:
//         return '';
//     }
//   };

//   // Renderizar el componente con el mensaje correspondiente
//   return (
//     <div className="text-center mt-10">
//       <p>{getMessage()}</p>
//     </div>
//   );
// };

// // Exportar el componente ConfirmAccount
// export default ConfirmAccount;


// import axiosClient from '@/config/axiosClient';

// const ConfirmAccount = () => {


//   return (
//     <div className="text-center mt-10">
//       <p>cuenta verificada</p>
//     </div>
//   );
// };

// export default ConfirmAccount;


// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axiosClient from '@/config/axiosClient';

// const ConfirmAccount = () => {
//   const [verificationStatus, setVerificationStatus] = useState('verifying');
//   const router = useRouter();
//   const { token } = router.query;

//   useEffect(() => {
//     const verifyAccount = async () => {
//       try {
//         if (!token) {
//           // Si el token no está presente en la URL, manejar el caso adecuado (por ejemplo, redirigir o mostrar un mensaje de error)
//           setVerificationStatus('error');
//           return;
//         }

//         const url = `/auth/verify-account/${token}`;
//         await axiosClient(url);
//         setVerificationStatus('success');
//       } catch (error) {
//         // Manejar el error, por ejemplo, si el token no es válido o ya ha sido utilizado.
//         setVerificationStatus('error');
//       }
//     };

//     if (token) {
//       verifyAccount();
//     }
//   }, [token]);

//   const getMessage = () => {
//     switch (verificationStatus) {
//       case 'verifying':
//         return 'Verificando cuenta...';
//       case 'success':
//         return '¡Felicidades, tu cuenta se verificó correctamente!';
//       case 'error':
//         return 'Hubo un error al verificar tu cuenta. Por favor, inténtalo de nuevo o contacta con soporte.';
//       default:
//         return '';
//     }
//   };

//   useEffect(() => {
//     // Redirigir a la página de inicio de sesión después de 5 segundos en caso de éxito
//     if (verificationStatus === 'success') {
//       const timer = setTimeout(() => {
//         router.push('/login');
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [verificationStatus]);

//   return (
//     <div className="text-center mt-10">
//       <p>{getMessage()}</p>
//     </div>
//   );
// };

// export default ConfirmAccount;


// // pages/confirm-account/[token].js

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { useParams } from 'react-router-dom'
// import axiosClient from '@/config/axiosClient';

// const ConfirmAccount = () => {
//   const [verificationStatus, setVerificationStatus] = useState('verifying');
//   const router = useRouter();
//   const params = useParams()
//   const { token } = router.query;

//   useEffect(() => {
//     const verifyAccount = async () => {
//       try {
//         if (!token) {
//           // Si el token no está presente en la URL, manejar el caso adecuado (por ejemplo, redirigir o mostrar un mensaje de error)
//           setVerificationStatus('error');
//           return;
//         }

//         const url = `/auth/verify-account/${token}`;
//         await axiosClient(url);
//         setVerificationStatus('success');
//       } catch (error) {
//         // Manejar el error, por ejemplo, si el token no es válido o ya ha sido utilizado.
//         setVerificationStatus('error');
//       }
//     };

//     if (token) {
//       verifyAccount();
//     }
//   }, [token]);

//   const getMessage = () => {
//     switch (verificationStatus) {
//       case 'verifying':
//         return 'Verificando cuenta...';
//       case 'success':
//         return '¡Felicidades, tu cuenta se verificó correctamente!';
//       case 'error':
//         return 'Hubo un error al verificar tu cuenta. Por favor, inténtalo de nuevo o contacta con soporte.';
//       default:
//         return '';
//     }
//   };

//   useEffect(() => {
//     // Redirigir a la página de inicio de sesión después de 5 segundos en caso de éxito
//     if (verificationStatus === 'success') {
//       const timer = setTimeout(() => {
//         router.push('/login');
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [verificationStatus]);

//   return (
//     <div className="text-center mt-10">
//       <p>{getMessage()}</p>
//     </div>
//   );
// };

// export default ConfirmAccount;

// // pages/confirm-account/[token].js

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axiosClient from '@/config/axiosClient';

// const ConfirmAccount = () => {
//   const [verificationStatus, setVerificationStatus] = useState('verifying');
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     const verifyAccount = async () => {
//       try {
//         if (!id) {
//           // Si el id no está presente en la URL, manejar el caso adecuado (por ejemplo, redirigir o mostrar un mensaje de error)
//           setVerificationStatus('error');
//           return;
//         }

//         const url = `/auth/verify-account/${id}`;
//         await axiosClient(url);
//         setVerificationStatus('success');
//       } catch (error) {
//         // Manejar el error, por ejemplo, si el id no es válido o ya ha sido utilizado.
//         setVerificationStatus('error');
//       }
//     };

//     if (id) {
//       verifyAccount();
//     }
//   }, [id]);

//   const getMessage = () => {
//     switch (verificationStatus) {
//       case 'verifying':
//         return 'Verificando cuenta...';
//       case 'success':
//         return '¡Felicidades, tu cuenta se verificó correctamente!';
//       case 'error':
//         return 'Hubo un error al verificar tu cuenta. Por favor, inténtalo de nuevo o contacta con soporte.';
//       default:
//         return '';
//     }
//   };

//   useEffect(() => {
//     // Redirigir a la página de inicio de sesión después de 5 segundos en caso de éxito
//     if (verificationStatus === 'success') {
//       const timer = setTimeout(() => {
//         router.push('/login');
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [verificationStatus]);

//   return (
//     <div className="text-center mt-10">
//       <p>{getMessage()}</p>
//     </div>
//   );
// };

// export default ConfirmAccount;


// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axiosClient from '@/config/axiosClient';
// import Link from 'next/link';

// const ConfirmAccount = () => {

//   const [accountConfirmated, setAccountConfirmated] = useState(false)
//   const [mensaje, guardarMensaje] = useState(null)
//   const router = useRouter();
//   const { id } = router.query;


//   useEffect(() => {
//     const verifyAccount = async () => {
//       try {
//         // if (!id) {
//         //   // No hay ID, manejar el caso adecuado (por ejemplo, redirigir o mostrar un mensaje de error)
//         //   setVerificationStatus('error');
//         //   return;
//         // }
  
//         const url = `/auth/verify-account/${id}`;
//         const { data } = await axiosClient(url);
//         guardarMensaje(`Felicidades estas confirmado`)
//         setAccountConfirmated(true)
//       } catch (error) {
//         console.error('Error al verificar cuenta:', error);
//         // Manejar el error, por ejemplo, si el id no es válido o ya ha sido utilizado.
//         // Actualizar el estado a 'error'
//        console.log(error)
//       }
//     };
  
//     // Verificar la cuenta solo si hay un id válido

//       verifyAccount();


//     // if (id) {
//     //   verifyAccount();
//     // }
  
//   }, []);

  
//   const mostrarMensaje = () => {
//     return(
//       <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
//           <p>{mensaje}</p>
//       </div>
//     )
//   }


//   return (
//     <>
//     {mensaje && mostrarMensaje()}

//     <h1 className="text-sky-600 font-black text-6xl capitalize">
//       Confirma Tu Cuenta y Comienza a Crear Tus
//       <span className="text-slate-700"> Proyectos</span>
//     </h1>

//     <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
//         {/* { msg && < Alerta alerta={alerta}/> } */}

//         {accountConfirmated && (
//           <Link
//             className="block text-center my-5 text-slate-500 uppercase text-sm"
//             href="/login"
//           >
//             Inicia Sesión
//           </Link>
//         )}
//     </div>
//   </>
//   );
// };

// export default ConfirmAccount;


// // pages/confirm-account/[token].js

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axiosClient from '@/config/axiosClient';

// const ConfirmAccount = () => {
//   const [verificationStatus, setVerificationStatus] = useState('verifying');
//   const router = useRouter();
//   const { id } = router.query;

//   // useEffect(() => {
//   //   const verifyAccount = async () => {
//   //     try {
//   //       const url = `/auth/verify-account/${id}`;
//   //       await axiosClient(url);
//   //       setVerificationStatus('success');
//   //     } catch (error) {
//   //       // Manejar el error, por ejemplo, si el id no es válido o ya ha sido utilizado.
//   //       setVerificationStatus('error');
//   //     }
//   //   };

//   //   if (id) {
//   //     verifyAccount();
//   //   }
//   // }, [id]);
//   useEffect(() => {
//     const verifyAccount = async (id) => {
//       try {
//         const url = `/auth/verify-account/${id}`;
//         await axiosClient(url);
//         setVerificationStatus('success');
//       } catch (error) {
//         setVerificationStatus('error');
//       }
//     };
  
//     // Obtener el valor de id directamente desde router.query
//     const idFromQuery = router.query.id;
  
//     // Verificar la cuenta solo si hay un id válido
//     if (idFromQuery) {
//       verifyAccount(idFromQuery);
//     }
//   }, [router.query.id]);
  

//   const getMessage = () => {
//     switch (verificationStatus) {
//       case 'verifying':
//         return 'Verificando cuenta...';
//       case 'success':
//         return '¡Felicidades, tu cuenta se verificó correctamente!';
//       case 'error':
//         return 'Hubo un error al verificar tu cuenta. Por favor, inténtalo de nuevo o contacta con soporte.';
//       default:
//         return '';
//     }
//   };

//   useEffect(() => {
//     // Redirigir a la página de inicio de sesión después de 5 segundos en caso de éxito
//     if (verificationStatus === 'success') {
//       const timer = setTimeout(() => {
//         router.push('/login');
//       }, 5000);

//       return () => clearTimeout(timer);
//     }
//   }, [verificationStatus]);

//   return (
//     <div className="text-center mt-10">
//       <p>{getMessage()}</p>
//     </div>
//   );
// };

// export default ConfirmAccount;


// // pages/confirm-account/[token].js

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import axiosClient from '@/config/axiosClient';
// import Link from 'next/link';

// const ConfirmAccount = () => {
//   const [accountConfirmed, setAccountConfirmed] = useState(false);
//   const [mensaje, guardarMensaje] = useState(null);
//   const router = useRouter();
//   const { id } = router.query;

//   useEffect(() => {
//     const confirmAccount = async () => {
//       try {
//         const url = `/auth/verify-account/${id}`;
//         const { data } = await axiosClient(url);

//         guardarMensaje(`Felicidades, tu cuenta se confirmó correctamente`);
//         setAccountConfirmed(true);
//       } catch (error) {
//         // Manejar el error, por ejemplo, redirigir a una página de error si el id no es válido o ya ha sido utilizado.
//       }
//     };

//     if (id) {
//       confirmAccount();
//     }
//   }, [id]);

//   const mostrarMensaje = () => {
//     return (
//       <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
//         <p>{mensaje}</p>
//       </div>
//     );
//   };

//   return (
//     <>
//       {mensaje && mostrarMensaje()}

//       <h1 className="text-sky-600 font-black text-6xl capitalize">
//         Confirma Tu Cuenta y Comienza a Crear Tus
//         <span className="text-slate-700"> Proyectos</span>
//       </h1>

//       <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
//         {accountConfirmed && (
//           <Link href="/login">
//             <a className="block text-center my-5 text-slate-500 uppercase text-sm">
//               Inicia Sesión
//             </a>
//           </Link>
//         )}
//       </div>
//     </>
//   );
// };

// export default ConfirmAccount;


// import { useEffect, useState } from "react"
// import axiosClient from "@/config/axiosClient"
// import { useRouter } from 'next/router';

// import Link from 'next/link';

// const ConfirmAccount = () => {
//     const [accountConfirmated, setAccountConfirmated] = useState(false)
//     const [mensaje, guardarMensaje] = useState(null)
//     const router = useRouter();
//     const { token } = router.query;
  
//     useEffect(() => {
//       const confirmAccount = async () => {
//         try {
//           const url = `/auth/verify-account/${token}`
//           const {data} = await axiosClient(url)
  
//           guardarMensaje(`Felicidades , tu cuenta se confirmo correctamente`)

//           setAccountConfirmated(true)
//         } catch (error) {
//         //   setAlerta({
//         //     msg: error.response.data.msg,
//         //     error: true
//         //   })
//         }
//       }
//       confirmAccount()
//     }, [])

//     const mostrarMensaje = () => {
//         return(
//           <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
//               <p>{mensaje}</p>
//           </div>
//         )
//       }
  
//     // const { msg } = alerta


//   return (
    
//     <>
//     {mensaje && mostrarMensaje()}

//     <h1 className="text-sky-600 font-black text-6xl capitalize">
//       Confirma Tu Cuenta y Comienza a Crear Tus
//       <span className="text-slate-700"> Proyectos</span>
//     </h1>

//     <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
//         {/* { msg && < Alerta alerta={alerta}/> } */}

//         {accountConfirmated && (
//           <Link
//             className="block text-center my-5 text-slate-500 uppercase text-sm"
//             href="/login"
//           >
//             Inicia Sesión
//           </Link>
//         )}
//     </div>
//   </>
//   )
// }

// export default ConfirmAccount