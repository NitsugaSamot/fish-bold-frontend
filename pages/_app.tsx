import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthProvider'
import { useRouter } from 'next/router';
import { BrowserRouter as Router } from 'react-router-dom';


export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return(

      <AuthProvider>
          <Component {...pageProps} router={router} />
      </AuthProvider>


  ) 
}
