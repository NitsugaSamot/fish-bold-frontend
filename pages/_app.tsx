import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '@/context/AuthProvider'
import { HashRouter } from 'react-router-dom'

export default function App({ Component, pageProps }: AppProps) {
  return(
    <HashRouter>
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
     </HashRouter>

  ) 
}
