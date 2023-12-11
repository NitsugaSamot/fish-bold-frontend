import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import Link from 'next/link'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import useAuth from '@/hooks/useAuth'
import axiosClient from '@/config/axiosClient'


const Login = () => {

  const [succesfullMsg, setSuccesfullMsg] = useState(null)
  const [unsuccesfulyMsg, setUnsuccesfulyMsg] = useState(null)

  const {setAuth} = useAuth()
  const router = useRouter()

  // Mutation para crear nuevos usuarios en apollo
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
                   .email('El email no es válido')
                   .required('El email no puede ir vacio'),
      password: Yup.string()
                    .required('El password es obligatorio')
    }),

    onSubmit: async valores => {
      // e.preventDefault()

      const {email, password} = valores
    
      try {
        //Informacion requerida: email y password
        const {data} = await axiosClient.post('/auth/login', {email, password})
        localStorage.setItem('token', data.jsontoken)
        setAuth(data)
        console.log(data)
        // guardarMensaje('Autenticando...')
        
        // setAuth(data)
        // navigate('/')
        // navigate('/logged_in')
        setSuccesfullMsg('Autenticando')


        
        setTimeout(() => {
          setSuccesfullMsg(null)
          router.push('/')
          // setAlert({})
        }, 2000);
  
      } catch (error) {

          setUnsuccesfulyMsg(error.response.data.msg);

          console.log(error)
          
          setTimeout(() => {
              setUnsuccesfulyMsg(null)
          }, 3000);
        
        }
    }
  })

  const showSuccessMessage = () => {
    return(
      <div className='bg-blue-900 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
          <p>{succesfullMsg}</p>
      </div>
    )
  }

  const showUnsuccessfulyMessage = () => {
    return(
      <div className='bg-red-700 color-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto'>
          <p>{unsuccesfulyMsg}</p>
      </div>
    )
  }
  return (
    
    <>
    <Layout>
        <div className='text-center text-2xl text-white font-light'> 
          {/* <img className='logo' src="/img/17.jpeg" alt="logo" /> */}
    
        </div> 

        {succesfullMsg && showSuccessMessage()}

        {unsuccesfulyMsg && showUnsuccessfulyMessage()}

        <div className='flex justify-center mt-5'>
          
            <div className='w-full max-w-sm'>
              
              
                  <form
                    className='bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4'
                    onSubmit={formik.handleSubmit}
                    >
                      <div className='text-center text-2xl text-white font-light mb-5'> 
                            <img className='logo' src="/img/17.jpeg" alt="logo" />
                      </div> 
                      <div>
                          <p className='text-black mb-5 text-2xl font-black text-center'>FISH//\\BOLD</p>
                      </div>

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='email'>
                            Email
                        </label>

                        <input 
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='email'
                          type='email'
                          placeholder='Tu email'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                        />
                      </div>

                      {formik.touched.email  && formik.errors.email ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                          {/* <p className='font-bold'>Error</p> */}
                          <p>{formik.errors.email}</p>
                        </div>
                      ) : null }

                      <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2 text-center' htmlFor='password'>
                            Password
                        </label>

                        <input 
                          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                          id='password'
                          type='password'
                          placeholder='Tu password'
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.password}
                        />
                      </div>

                      {formik.touched.password  && formik.errors.password ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                          {/* <p className='font-bold'>Error</p> */}
                          <p>{formik.errors.password}</p>
                        </div>
                      ) : null }

                      <input
                         type='submit'
                         className='bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-blue-800'
                         value='Iniciar Sesión'  
                      />
                  </form>
                  <Link legacyBehavior href='/new-account'>
                    <a className='text-white block text-center '>
                      ¿No tienes cuenta? Registrate
                    </a>
                    
                </Link>
            </div>


        </div>
    </Layout>
</>
  )
}

export default Login