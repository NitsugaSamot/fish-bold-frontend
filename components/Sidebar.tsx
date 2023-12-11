import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import useAuth from '@/hooks/useAuth';
import useAuth, { AuthData } from '@/hooks/useAuth';

const Sidebar = () => {
  const router = useRouter();
//   const { auth, closeSessionAuth } = useAuth();
const { auth, closeSessionAuth } = useAuth() as AuthData; // Usa 'as AuthData' para indicar el tipo

  console.log(auth)

  const handleCloseSesion = () => {
    closeSessionAuth();
    localStorage.removeItem('token');
  };

  return (
    <aside className="bg-blue-700 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div className='text-center text-2xl text-white font-light mb-5'> 
        <img className='logo' src="/img/17.jpeg" alt="logo" />
      </div> 
       
      <div>
        <p className='text-white text-2xl font-black text-center'>FISH//\\BOLD</p>
      </div>

       <nav className='mt-5 list-none'>
                <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
                <Link legacyBehavior href='/'>
                    <a className='text-white block text-center'>Inicio</a>
                </Link>
                </li>

                {/* <li className={router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'}>
                <Link legacyBehavior href='/products'>
                    <a className='text-white block text-center'>Productos</a>
                </Link>
                </li> */}

                { auth._id ? (
                    <div>
                         <li className={router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'}>
                         <Link legacyBehavior href='/orders'>
                             <a className='text-white block text-center'>Pedidos</a>
                         </Link>
                         </li>

                         <li className={router.pathname === '/payments' ? 'bg-blue-800 p-2' : 'p-2'}>
                         <Link legacyBehavior href='/payments'>
                             <a className='text-white block text-center'>Pagos</a>
                         </Link>
                         </li> 
                    </div>
                
                ) 
                
                : (
                    <p></p>
                )}
       </nav>

       <div className='text-center mt-7'>
    { auth._id ? (
        // Usuario autenticado, mostrar botón de Cerrar Sesión
        <button
            type="button"
            className="text-white text-sm bg-blue-600 p-3 rounded-md uppercase font-bold"
            onClick={handleCloseSesion}
        >
            Cerrar Sesión
        </button>
    ) : (
        // Usuario no autenticado, mostrar botón de Iniciar Sesión
        <Link legacyBehavior href="/login">
            <a className="text-white text-sm bg-blue-600 p-3 rounded-md uppercase font-bold">
                Iniciar Sesión
            </a>
        </Link>
    )}
</div>
    </aside>
  );
}

export default Sidebar;



// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import useAuth from '@/hooks/useAuth';

// const Sidebar = () => {
//   const router = useRouter();
//   const { closeSessionAuth } = useAuth();

//   const handleCloseSesion = () => {
//     closeSessionAuth();
//     localStorage.removeItem('token');
//   };

//   return (
//     <aside className="bg-blue-700 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
//       <div className='text-center text-2xl text-white font-light mb-5'> 
//         <img className='logo' src="/img/17.jpeg" alt="logo" />
//       </div> 
       
//       <div>
//         <p className='text-white text-2xl font-black text-center'>FISH//\\BOLD</p>
//       </div>

//       <nav className='mt-5 list-none'>
//         <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/'>
//             <a className='text-white block text-center'>Inicio</a>
//           </Link>
//         </li>

//         <li className={router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/products'>
//             <a className='text-white block text-center'>Productos</a>
//           </Link>
//         </li>

//         <li className={router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/orders'>
//             <a className='text-white block text-center'>Pedidos</a>
//           </Link>
//         </li>

//         <li className={router.pathname === '/payments' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/payments'>
//             <a className='text-white block text-center'>Pagos</a>
//           </Link>
//         </li>
//       </nav>

//       <div className='text-center mt-7'>
//         <button
//           type="button"
//           className="text-white text-sm bg-blue-600 p-3 rounded-md uppercase font-bold"
//           onClick={handleCloseSesion}
//         >
//           Cerrar Sesión    
//         </button>   
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;


// import React from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import useAuth from '@/hooks/useAuth';

// const Sidebar = () => {
//   const router = useRouter();
//   const { closeSessionAuth } = useAuth();

//   const handleCloseSesion = () => {
//     closeSessionAuth();
//     localStorage.removeItem('token');
//   };

//   return (
//     <aside className="bg-blue-700 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
//       <div className='text-center text-2xl text-white font-light mb-5'> 
//         <img className='logo' src="/img/17.jpeg" alt="logo" />
//       </div> 
       
//       <div>
//         <p className='text-white text-2xl font-black text-center'>FISH//\\BOLD</p>
//       </div>

//       <nav className='mt-5 list-none'>
//         <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/'>
//             Inicio
//           </Link>
//         </li>

//         <li className={router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/products'>
//             Productos
//           </Link>
//         </li>

//         <li className={router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/orders'>
//             Pedidos
//           </Link>
//         </li>

//         <li className={router.pathname === '/payments' ? 'bg-blue-800 p-2' : 'p-2'}>
//           <Link legacyBehavior href='/payments'>
//             Pagos
//           </Link>
//         </li>
//       </nav>

//       <div className='text-center mt-7'>
//         <button
//           type="button"
//           className="text-white text-sm bg-blue-600 p-3 rounded-md uppercase font-bold"
//           onClick={handleCloseSesion}
//         >
//           Cerrar Sesión    
//         </button>   
//       </div>
//     </aside>
//   );
// }

// export default Sidebar;

// import React from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import useAuth from '@/hooks/useAuth'

// const Sidebar = () => {

//     const router = useRouter()
//     const {closeSessionAuth} = useAuth()

//     const handleCloseSesion = () => {
//         closeSessionAuth()
//         // cerrarSesionProyectos()
//         localStorage.removeItem('token')
//     }


//   return (
//     // <aside className="bg-indigo-900 sm:w-1/3 xl:w-1/5">
//     <aside className="bg-blue-700 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">

//         <div className='text-center text-2xl text-white font-light mb-5'> 
//                 <img className='logo' src="/img/17.jpeg" alt="logo" />
//         </div> 
         
//         <div>
//             <p className='text-white text-2xl font-black text-center'>FISH//\\BOLD</p>
//         </div>

//         <nav className='mt-5 list-none'>

//             <li className={router.pathname === '/' ? 'bg-blue-800 p-2' : 'p-2'}>
                
//                 <Link legacyBehavior href='/'>
//                     <a className='text-white block text-center'>
//                       Inicio
//                     </a>
                    
//                 </Link>
//             </li>

//             <li className={router.pathname === '/products' ? 'bg-blue-800 p-2' : 'p-2'}>
                
//                 <Link legacyBehavior href='/products'>
//                     <a className='text-white block text-center'>
//                       Productos
//                     </a>
                    
//                 </Link>
//             </li>

//             <li className={router.pathname === '/orders' ? 'bg-blue-800 p-2' : 'p-2'}>

//                 <Link legacyBehavior href='/orders'>
//                     <a className='text-white block text-center'>
//                         Pedidos
//                     </a>
//                 </Link>

//             </li>

//             <li className={router.pathname === '/payments' ? 'bg-blue-800 p-2' : 'p-2'}>

//                 <Link legacyBehavior href='/payments'>
//                     <a className='text-white block text-center'>
//                         Pagos
//                     </a>
//                 </Link>
//             </li>
//         </nav>

//         <div className='text-center mt-7'>
//             <button
//                 type="button"
//                 className="text-white text-sm bg-blue-600 p-3 rounded-md uppercase font-bold"
//                 onClick={handleCloseSesion}
//             >
//                 Cerrar Sesión    
//             </button>   
//         </div>
   
//     </aside>
//   )
// }

// export default Sidebar