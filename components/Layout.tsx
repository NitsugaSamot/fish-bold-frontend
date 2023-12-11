import Head from 'next/head';

import Sidebar from './Sidebar';
import { useRouter } from 'next/router';
import PrivateRoute from './private-route/PrivateRoute'; // Importar el nuevo componente

import React, { ReactNode } from 'react';
interface LayoutProps {
  children: ReactNode;
}


const Layout: React.FC<LayoutProps>  = ({children}) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>CRM - Administración de Clientes</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
      </Head>
      

      {router.pathname === '/login' || router.pathname === '/new-account' ? (
        <div className="bg-blue-800 min-h-screen flex flex-col justify-center">
          {children}
        </div>
      ) : (
        <div className="bg-blue-600 min-h-screen">
          <div className="flex min-h-screen">
            <Sidebar />

            <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
              {/* Utilizar PrivateRoute alrededor de las secciones protegidas */}
              <PrivateRoute>{children}</PrivateRoute>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;


// import Head from "next/head"
// import Sidebar from "./Sidebar"
// import { useRouter } from "next/router"
// import PrivateRoute from "./private-route/PrivateRoute"

// const Layout = ({children}) => {

//     const router = useRouter()

//   return (
//     <>
//         <Head>

//         <title>CRM - Administración de Clientes</title>
//                 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU=" crossOrigin="anonymous" />
//         </Head>

//         {router.pathname === '/login'  || router.pathname === '/new-account' ? (
//                 <div className='bg-blue-800 min-h-screen flex flex-col justify-center' >
                    
//                             {children}
                    
//                 </div>

//         ) : (
//             <div className="bg-blue-600 min-h-screen">
//             <div className="flex min-h-screen">
//                 <Sidebar/>
                
//                 <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
//                     <PrivateRoute>
//                             {children}
//                     </PrivateRoute>
                    
//                 </main>
               
//             </div>
//         </div>
//         )}




//     </>
//   )
// }

// export default Layout