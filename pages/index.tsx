import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import Products from '@/components/products/products'


const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  return (
    <div>
        <Layout>
            <Products/>
        </Layout>
    </div>
  )
}
