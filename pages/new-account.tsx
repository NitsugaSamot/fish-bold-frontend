import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosClient from '@/config/axiosClient';

const NewAccount = () => {
  const [mensaje, guardarMensaje] = useState<string | null>(null);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('El nombre es obligatorio'),
      email: Yup.string()
        .email('El email no es válido')
        .required('El email es obligatorio'),
      password: Yup.string()
        .required('El password es obligatorio')
        .min(6, 'El password debe ser de al menos 6 caracteres'),
    }),
    onSubmit: async (valores) => {
      const { name, email, password } = valores;

      try {
        const { data } = await axiosClient.post(`/auth/register`, { name, email, password });

        guardarMensaje(`Felicidades ${name}, estás a un paso de ser miembro definitivo. Verifica tu cuenta en el email que ha sido enviado`);

        setTimeout(() => {
          guardarMensaje(null);
          router.push('/login');
        }, 5000);
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.msg) {
          guardarMensaje(error.response.data.msg);
      } else {
          console.error(error);
      }
  
        setTimeout(() => {
          guardarMensaje(null);
        }, 5000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
        <p>{mensaje}</p>
      </div>
    );
  };

  return (
    <>
      <Layout>
        {mensaje && mostrarMensaje()}

        <div className='text-center text-2xl text-white font-light'>Crear nueva cuenta</div>

        <div className='flex justify-center mt-5'>
          <div className='w-full max-w-sm'>
            <form className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4' onSubmit={formik.handleSubmit}>
              <div className='text-center text-2xl text-white font-light mb-5'>
                <img className='logo' src="/img/17.jpeg" alt="logo" />
              </div>

              <div>
                <p className='text-black mb-5 text-2xl font-black text-center'>FISH//\\BOLD</p>
              </div>

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='name'>
                  Nombre
                </label>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='name'
                  type='name'
                  placeholder='Tu nombre'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.name && formik.errors.name ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.name}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='email'>
                  Email
                </label>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='email'
                  type='email'
                  placeholder='Tu email'
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>

              {formik.touched.email && formik.errors.email ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.email}</p>
                </div>
              ) : null}

              <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='password'>
                  Password
                </label>

                <input
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  id='password'
                  type='password'
                  placeholder='Tu password'
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                  <p className='font-bold'>Error</p>
                  <p>{formik.errors.password}</p>
                </div>
              ) : null}

              <input
                type='submit'
                className='bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-blue-800'
                value='Registrar Usuario'
              />
            </form>
            <Link legacyBehavior href='/login'>
              <a className='text-white block text-center '>
                ¿Tienes cuenta? Inicia sesión
              </a>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NewAccount;


// import React, {useState} from 'react'
// import { useRouter } from 'next/router'
// import Layout from '@/components/Layout'
// import Link from 'next/link'
// import { useFormik } from 'formik'
// import * as Yup from 'yup'
// import axiosClient from '@/config/axiosClient'

// const NewAccount = () => {

//     //State para el mensaje
//     const [mensaje, guardarMensaje] = useState(null)


//     // Mutatiobn para crear usuarios
//     // const [ nuevoUsuario ] = useMutation(NUEVA_CUENTA) 
//     //Routing
//     const router = useRouter()

//     // Validación de formulario
//     const formik = useFormik({
//       initialValues: {
//         name: '',
//         email: '',
//         password: ''
//       },
//       validationSchema: Yup.object({
//         name: Yup.string()
//                     .required('El nombre es obligatorio'),
//         email: Yup.string()
//                     .email('El email no es válido')
//                     .required('El email es obligatorio'),
//         password: Yup.string()
//                     .required( 'El password es obligatorio')
//                     .min(6, 'El password debe ser de al menos 6 caracteres')
//       }),
//       onSubmit: async valores =>  {
  
//         const {name, email, password} = valores
  
//         try {
//           const { data } = await axiosClient.post(`/auth/register`, { name, email, password });

//           guardarMensaje(`Felicidades ${name}, estas a un paso de ser miembro definitivo , verifica tu cuanta al email que ha sido enviado`)

//           setTimeout(() => {
//             guardarMensaje(null);
//             router.push('/login');
//           }, 5000);
  
//         } catch (error) {
//           guardarMensaje(error.response.data.msg);
//           console.log(error.response.data.msg)
  
//           setTimeout(() => {
//             guardarMensaje(null)
            
//           }, 5000);
  
//         }
//       }
//     })
  
//     // const mostrarMensajeTemporal = () => {
//     //   if (successMessage) {
//     //     return (
//     //       <div className='bg-green-500 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-white'>
//     //         <p>{successMessage}</p>
//     //       </div>
//     //     );
//     //   } else if (errorMessage) {
//     //     return (
//     //       <div className='bg-red-500 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto text-white'>
//     //         <p>{errorMessage}</p>
//     //       </div>
//     //     );
//     //   }
//     // };
    
  
//     const mostrarMensaje = () => {
//       return(
//         <div className='bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
//             <p>{mensaje}</p>
//         </div>
//       )
//     }
//   return (
//     <>


//     <Layout>
      
//       {mensaje && mostrarMensaje()}

//       {/* {mostrarMensajeTemporal()} */}

//         <div className='text-center text-2xl text-white font-light'> Crear nueva cuenta</div> 

//         <div className='flex justify-center mt-5'>
//             <div className='w-full max-w-sm'>
//                   <form
//                     className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
//                     onSubmit={formik.handleSubmit}
//                     >
//                       <div className='text-center text-2xl text-white font-light mb-5'> 
//                             <img className='logo' src="/img/17.jpeg" alt="logo" />
//                       </div> 

//                       <div>
//                           <p className='text-black mb-5 text-2xl font-black text-center'>FISH//\\BOLD</p>
//                       </div>

//                       <div className='mb-4'>
//                         <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='name'>
//                             Nombre
//                         </label>

//                         <input 
//                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                           id='name'
//                           type='name'
//                           placeholder='Tu nombre'
//                           value={formik.values.name}
//                           onChange={formik.handleChange}
//                           onBlur={formik.handleBlur}
//                         />
//                       </div>

//                       {formik.touched.name  && formik.errors.name ? (
//                         <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
//                           <p className='font-bold'>Error</p>
//                           <p>{formik.errors.name}</p>
//                         </div>
//                       ) : null }



//                       <div className='mb-4'>
//                         <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='email'>
//                             Email
//                         </label>

//                         <input 
//                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                           id='email'
//                           type='email'
//                           placeholder='Tu email'
//                           value={formik.values.email}
//                           onBlur={formik.handleBlur}
//                           onChange={formik.handleChange}
//                         />
//                       </div>

//                       {formik.touched.email  && formik.errors.email ? (
//                         <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
//                           <p className='font-bold'>Error</p>
//                           <p>{formik.errors.email}</p>
//                         </div>
//                       ) : null }

//                       <div className='mb-4'>
//                         <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='password'>
//                             Password
//                         </label>

//                         <input 
//                           className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
//                           id='password'
//                           type='password'
//                           placeholder='Tu password'
//                           value={formik.values.password}
//                           onBlur={formik.handleBlur}
//                           onChange={formik.handleChange}
//                         />
//                       </div>

//                       {formik.touched.password  && formik.errors.password ? (
//                         <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
//                           <p className='font-bold'>Error</p>
//                           <p>{formik.errors.password}</p>
//                         </div>
//                       ) : null }


//                       <input
//                          type='submit'
//                          className='bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-blue-800'
//                          value='Registrar Usuario'  
//                       />
//                   </form>
//                   <Link legacyBehavior href='/login'>
//                     <a className='text-white block text-center '>
//                       ¿Tienes cuenta? Inicia sesión
//                     </a>
                    
//                 </Link>
//             </div>
//         </div>
//     </Layout>
// </>
//   )
// }

// export default NewAccount