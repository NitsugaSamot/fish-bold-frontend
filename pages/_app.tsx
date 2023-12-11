import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthProvider'
import { BrowserRouter, HashRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <BrowserRouter>
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
     </BrowserRouter>

  ) 
}
